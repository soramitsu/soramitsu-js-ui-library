import type { TableRow } from '@/components/Table/types'

export function useColumnExpand() {
  const expandedRows = shallowReactive(new Set<TableRow>())

  function toggleRowExpanded(row: TableRow, value?: boolean) {
    if ((value !== undefined && !value) || (value === undefined && expandedRows.has(row))) {
      expandedRows.delete(row)

      return
    }

    expandedRows.add(row)
  }

  return {
    expandedRows,
    toggleRowExpanded,
  }
}
