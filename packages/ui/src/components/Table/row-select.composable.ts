import { Ref } from 'vue'
import { TableRow } from '@/components/Table/types'

export function useRowSelect(data: Ref<TableRow[]>) {
  const selectedRows = shallowReactive(new Set<TableRow>())
  const isAllSelected = computed(() => selectedRows.size === data.value.length)
  const isSomeSelected = computed(() => selectedRows.size > 0)

  function toggleAllSelections() {
    if (isAllSelected.value) {
      selectedRows.clear()

      return
    }

    for (let row of data.value) {
      selectedRows.add(row)
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
    toggleAllSelections,
    toggleRowSelection,
  }
}
