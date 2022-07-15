import { InjectionKey, UnwrapRef, DeepReadonly } from 'vue'
import { SelectOption, SelectSize } from './types'
import { UseSelectModelReturn } from './composable.model'
import { forceInject } from '@/util'

export interface SelectApi<T> extends DeepReadonly<UnwrapRef<UseSelectModelReturn<T>>> {
  readonly options: DeepReadonly<UnwrapRef<SelectOption<T>>[]>
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
