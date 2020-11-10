import { Size, SizeExtended } from '../../types'

export enum PickerTypes {
  YEAR = 'year',
  MONTH = 'month',
  DATE = 'date',
  DATES = 'dates',
  DATETIME = 'datetime',
  WEEK = 'week',
  DATETIMERANGE = 'datetimerange',
  DATERANGE = 'daterange',
  MONTHRANGE = 'monthrange'
}

export enum PickerAlignment {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center'
}

export enum InputTypes {
  INPUT = 'input',
  SELECT = 'select'
}

export const PickerSize = Size
export const BorderRadius = SizeExtended
