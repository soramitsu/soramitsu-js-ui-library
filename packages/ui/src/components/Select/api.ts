import { InjectionKey, UnwrapRef } from 'vue'
import { SelectOption, SelectOptionGroup, SelectSize } from './types'
import { UseSelectModelReturn } from './use-model'
import { forceInject } from '@/util'

export interface SelectApi<T> extends UnwrapRef<UseSelectModelReturn<T>> {
  readonly options: UnwrapRef<SelectOption<T>[] | SelectOptionGroup<T>[]>
  readonly multiple: boolean
  readonly disabled: boolean
  readonly label: string | null
  readonly size: SelectSize
  readonly noAutoClose: boolean

  readonly isMenuOpened: boolean
  /**
   * Set menu visibility manually
   */
  menuToggle: (value?: boolean) => void
}

export const SELECT_API_KEY: InjectionKey<SelectApi<any>> = Symbol('SelectAPI')

export function useSelectApi<T = any>(): SelectApi<T> {
  return forceInject(SELECT_API_KEY)
}
