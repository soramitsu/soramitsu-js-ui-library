import { TableActionColumnApi, TableColumnApi } from './api'

export function isDefaultColumn(column: TableColumnApi | TableActionColumnApi): column is TableColumnApi {
  return column.type === 'default'
}

export function isSelectionColumn(
  column: TableColumnApi | TableActionColumnApi,
): column is TableActionColumnApi & { type: 'selection' } {
  return column.type === 'selection'
}

export function isExpandColumn(
  column: TableColumnApi | TableActionColumnApi,
): column is TableActionColumnApi & { type: 'expand' } {
  return column.type === 'expand'
}

// Without type predicate checked like this object becomes object without keys
export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object'
}
