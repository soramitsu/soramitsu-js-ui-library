import { ActionColumnApi, ColumnApi } from '@/components'

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
