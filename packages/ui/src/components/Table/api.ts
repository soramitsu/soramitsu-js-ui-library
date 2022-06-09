import { InjectionKey, DeepReadonly, Slot } from 'vue'
import { forceInject } from '@/util'
import {
  ColumnCellValueFormatter,
  ColumnSortBy,
  ColumnSortOrder,
  TableColumnAlign,
  TableColumnType,
} from '@/components/Table/types'

export interface ColumnWidthProps {
  width: null | number
  minWidth: number
  realWidth: number
}

export interface ColumnAlignProps {
  align: TableColumnAlign
  headerAlign: TableColumnAlign
}

export interface ColumnSortProps {
  sortable: boolean | 'custom'
  sortMethod: <T>(a: T, b: T) => number
  sortBy: ColumnSortBy
  sortOrders: ColumnSortOrder[]
}

export interface CommonColumnApi extends ColumnWidthProps, ColumnAlignProps, ColumnSortProps {
  id: string
  label?: string
  cellSlot?: Slot
  headerSlot?: Slot
  showOverflowTooltip?: boolean
  className: string
  labelClassName: string
  formatter: ColumnCellValueFormatter | null
}

export interface ColumnApi extends CommonColumnApi {
  type: 'default'
  prop: string
}

export interface ActionColumnApi extends CommonColumnApi {
  type: 'selection' | 'expand'
  prop?: string
}

export interface TableApi {
  /**
   * Should be called inside item on setup. Unregister on scope dispose automatically
   */
  register: (options: ColumnApi | ActionColumnApi) => void
}

export const TABLE_API_KEY: InjectionKey<DeepReadonly<TableApi>> = Symbol('TableAPI')
export const useTableApi = () => forceInject(TABLE_API_KEY)
