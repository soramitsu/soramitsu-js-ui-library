import { InjectionKey, DeepReadonly, Slot } from 'vue'
import { forceInject } from '@/util'
import { ColumnSortBy, ColumnSortOrder, TableColumnAlign } from '@/components/Table/types'

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

export interface ColumnApi extends ColumnWidthProps, ColumnAlignProps, ColumnSortProps {
  id: string
  prop: string
  label?: string
  cellSlot?: Slot
  headerSlot?: Slot
  showOverflowTooltip?: boolean
}

export interface TableApi {
  /**
   * Should be called inside item on setup. Unregister on scope dispose automatically
   */
  register: (options: ColumnApi) => void
}

export const TABLE_API_KEY: InjectionKey<DeepReadonly<TableApi>> = Symbol('TableAPI')
export const useTableApi = () => forceInject(TABLE_API_KEY)
