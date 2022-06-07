import { TABLE_COLUMN_ALIGN_VALUES, TABLE_COLUMN_TYPE_VALUES } from './consts'
import { ColumnApi } from '@/components'

export type TableColumnType = typeof TABLE_COLUMN_TYPE_VALUES[number]
export type TableColumnAlign = typeof TABLE_COLUMN_ALIGN_VALUES[number]

export type TableRow = Record<string, unknown>

export type CellEventData = [TableRow, ColumnApi, EventTarget, MouseEvent]
export type RowEventData = [TableRow, ColumnApi, MouseEvent]
export type HeaderEventData = [ColumnApi, MouseEvent]
export interface SortEventData {
  column: ColumnApi
  prop: string
  order: ColumnSortOrder
}

export type ColumnSortByPropKeyFunc = (row: TableRow, index: number) => string
export type ColumnSortBy = string | ColumnSortByPropKeyFunc | (ColumnSortByPropKeyFunc | string)[]
export type ColumnSortOrder = 'ascending' | 'descending' | null
