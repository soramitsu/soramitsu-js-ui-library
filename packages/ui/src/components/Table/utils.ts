import { ActionColumnApi, ColumnApi } from './api'

export function isDefaultColumn(column: ColumnApi | ActionColumnApi): column is ColumnApi {
  return column.type === 'default'
}

export function isSelectionColumn(
  column: ColumnApi | ActionColumnApi,
): column is ActionColumnApi & { type: 'selection' } {
  return column.type === 'selection'
}

export function isExpandColumn(column: ColumnApi | ActionColumnApi): column is ActionColumnApi & { type: 'expand' } {
  return column.type === 'expand'
}

// Without type predicate checked like this object becomes object without keys
export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object'
}
