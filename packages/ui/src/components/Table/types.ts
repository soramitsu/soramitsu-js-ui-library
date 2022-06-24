import { TABLE_COLUMN_ALIGN_VALUES, TABLE_COLUMN_TYPE_VALUES } from './consts'
import { ActionColumnApi, ColumnApi } from '@/components'

export type TableColumnType = typeof TABLE_COLUMN_TYPE_VALUES[number]
export type TableColumnAlign = typeof TABLE_COLUMN_ALIGN_VALUES[number]

export type TableRow = Record<string, unknown>

export type CellEventData = [TableRow, ColumnApi | ActionColumnApi, EventTarget, MouseEvent]
export type RowEventData = [TableRow, ColumnApi | ActionColumnApi, MouseEvent]
export type HeaderEventData = [ColumnApi | ActionColumnApi, MouseEvent]
export interface SortEventData {
  column: ColumnApi
  prop: string
  order: ColumnSortOrder
}

export type ColumnCellValueFormatter = (
  row: TableRow,
  column: ColumnApi,
  cellValue: TableRow[string],
  index: number,
) => string
export type ColumnSortByPropKeyFunc = (row: TableRow, index: number) => string
export type ColumnRowSelectableFunc = (row: TableRow, index: number) => boolean
export type ColumnSortBy = string | ColumnSortByPropKeyFunc | (ColumnSortByPropKeyFunc | string)[]
export type ColumnSortOrder = 'ascending' | 'descending' | null

export interface TableRowConfigCallbackParams {
  row: TableRow
  rowIndex: number
}

export interface TableCellConfigCallbackParams {
  row: TableRow
  rowIndex: number
  column: ColumnApi
  columnIndex: number
}

export interface TableHeaderCellConfigCallbackParams {
  column: ColumnApi
  columnIndex: number
}
