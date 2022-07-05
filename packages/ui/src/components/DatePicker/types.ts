export type DatePickerType = 'day' | 'range' | 'pick'

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

export interface PresetOption {
  label: string
  value: RangeOptionValue | Date
}

export interface Options {
  range: PresetOption[]
  day: PresetOption[]
  pick?: PresetOption[]
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
