import { Ref } from 'vue'
import { ColumnRowSelectableFunc, TableRow } from '@/components/Table/types'
import { isSelectionColumn } from '@/components/Table/utils'
import { ActionColumnApi, ColumnApi } from '@/components'

export function useRowSelect(
  data: Ref<TableRow[]>,
  columns: (ColumnApi | ActionColumnApi)[],
  options: { selectOnIndeterminate: boolean },
) {
  const selectedRows = shallowReactive(new Set<TableRow>())
  const isAllSelected = computed(() => selectedRows.size === data.value.length)
  const isSomeSelected = computed(() => selectedRows.size > 0)
  const activeSelectionColumn = computed(() => {
    let res

    for (let column of columns) {
      if (isSelectionColumn(column)) {
        res = column
      }
    }

    return res
  })

  function toggleAllSelections(selectable: ColumnRowSelectableFunc | null) {
    const selectableRows = selectable ? data.value.filter((row, index) => !selectable(row, index)) : data.value

    if (selectedRows.size === selectableRows.length) {
      selectedRows.clear()

      return
    }

    if (selectedRows.size === 0) {
      for (let row of selectableRows) {
        selectedRows.add(row)
      }

      return
    }

    if (options.selectOnIndeterminate) {
      for (let row of selectableRows) {
        selectedRows.add(row)
      }
    } else {
      selectedRows.clear()
    }
  }

  function toggleRowSelection(row: TableRow) {
    if (selectedRows.has(row)) {
      selectedRows.delete(row)

      return
    }

    selectedRows.add(row)
  }

  return {
    selectedRows,
    isAllSelected,
    isSomeSelected,
    activeSelectionColumn,
    toggleAllSelections,
    toggleRowSelection,
  }
}
