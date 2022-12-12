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

export function isDetailsColumn(
  column: TableColumnApi | TableActionColumnApi,
): column is TableActionColumnApi & { type: 'details' } {
  return column.type === 'details'
}

// Without type predicate checked like this object becomes object without keys
export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object'
}
