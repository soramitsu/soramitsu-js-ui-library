import { TableRow } from '@/components/Table/types'
import { ActionColumnApi, ColumnApi } from '@/components'
import { isExpandColumn } from "@/components/Table/utils";

export function useColumnExpand(columns: (ColumnApi | ActionColumnApi)[]) {
  const expandedRows = shallowReactive(new Set<TableRow>())
  const lastExpandColumn = computed(() => {
    let res

    for (let column of columns) {
      if (isExpandColumn(column)) {
        res = column
      }
    }

    return res
  })

  function toggleRowExpanded(row: TableRow) {
    if (expandedRows.has(row)) {
      expandedRows.delete(row)

      return
    }

    expandedRows.add(row)
  }

  return {
    activeExpandColumn: lastExpandColumn,
    expandedRows,
    toggleRowExpanded,
  }
}
