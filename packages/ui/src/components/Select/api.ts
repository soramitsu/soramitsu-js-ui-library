import type { InjectionKey } from 'vue'
import type { OptionDataGetters, SelectButtonStyle, SelectOptionStyle, SelectSize } from './types'
import { forceInject } from '@/util'

export interface SelectApi<T, U> {
  readonly multiple: boolean
  readonly disabled: boolean
  readonly size: SelectSize
  readonly optionStyle: SelectOptionStyle
  readonly buttonStyle: SelectButtonStyle
  readonly optionGetters: OptionDataGetters<T, U>
  readonly modelAsOptions: null | T | T[]
  readonly isEmptySelection: boolean
}

export const SELECT_API_KEY: InjectionKey<SelectApi<any, any>> = Symbol('SelectAPI')

export function useSelectApi<T, U>(): SelectApi<T, U> {
  return forceInject(SELECT_API_KEY)
}
