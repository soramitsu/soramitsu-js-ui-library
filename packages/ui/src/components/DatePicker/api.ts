import { forceInject } from '@/util'
import { InjectionKey } from 'vue'
import { DatePickerType } from './types'

export interface DatePickerApi {
  type: DatePickerType
  time: boolean
  disabled: boolean
  dateFilter: (d: Date, precision: 'date' | 'datetime') => boolean
}

export const DATE_PICKER_API_KEY: InjectionKey<DatePickerApi> = Symbol('datePicker')

export function useDatePickerApi(): DatePickerApi {
  return forceInject(DATE_PICKER_API_KEY)
}
