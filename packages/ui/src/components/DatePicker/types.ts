export type DatePickerType = 'day' | 'range' | 'pick'

export type ModelValueType = Date[] | Date | null | undefined

export interface RangeState {
  selecting: boolean
  startDate: Date | null
  endDate: Date | null
}

export interface RangeOptionValue extends RangeState {
  selectedField: string
}

export type PickState = Date[]

export type DateState = Date

export interface StateStore {
  dayState: DateState
  pickState: PickState
  rangeState: RangeState
}

export interface PresetOption<T> {
  label: string
  value: T
}

export interface DatePickerOptions {
  day?: PresetOption<Date>[]
  range?: PresetOption<[Date, Date]>[]
  pick?: PresetOption<Date[]>[]
}

export interface ShowState {
  month: number
  year: number
}

export type DateTableCellType = 'normal' | 'today' | 'prev-month' | 'next-month'

export interface DateTableCell {
  type: DateTableCellType
  inRange: boolean
  start: boolean
  end: boolean
  time: string | null
  day: number
  month: number
  text: number
}
