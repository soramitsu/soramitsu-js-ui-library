import { InjectionKey, UnwrapRef, DeepReadonly } from 'vue'
import { SelectOption, SelectSize } from './types'
import { UseSelectModelReturn } from './tools'

export interface SelectApi<T> extends DeepReadonly<UnwrapRef<UseSelectModelReturn<T>>> {
  readonly options: DeepReadonly<UnwrapRef<SelectOption<T>>[]>
  readonly multiple: boolean
  readonly disabled: boolean
  readonly label: string | null
  readonly size: SelectSize

  readonly isMenuOpened: boolean
  menuToggle: (value?: boolean) => void
}

export const SELECT_API_KEY: InjectionKey<SelectApi<any>> = Symbol('SelectAPI')

export function useSelectApi<T = any>(): SelectApi<T> {
  const val = inject(SELECT_API_KEY)
  if (!val) {
    throw new Error('Injection failed; You should use this only inside of the SSelectBase component')
  }
  return val
}
