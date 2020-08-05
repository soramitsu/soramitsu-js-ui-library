import { Size } from '@/types/size'

export enum ColumnType {
  SELECTION = 'selection',
  INDEX = 'index',
  EXPAND = 'expand'
}

export enum ColumnFixedPosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum SortDirection {
  ASC = 'ascending',
  DESC = 'descending'
}

export enum ColumnAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export const TableSize = Size
