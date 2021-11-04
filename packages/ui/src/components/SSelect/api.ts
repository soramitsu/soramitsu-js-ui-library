// import { MaybeRef } from '@vueuse/core'
import { InjectionKey, UnwrapRef, DeepReadonly, inject, Ref, readonly, provide } from 'vue'
import { Option, SSelectSize } from './types'
import { UseSelectModelReturn } from './tools'

export interface SSelectApi<T> extends DeepReadonly<UnwrapRef<UseSelectModelReturn<T>>> {
  readonly options: DeepReadonly<UnwrapRef<Option<T>>[]>
  readonly multiple: boolean
  readonly disabled: boolean
  readonly label: string | null
  readonly size: SSelectSize

  readonly isMenuOpened: boolean
  menuToggle: (value?: boolean) => void
}

export const S_SELECT_API_KEY: InjectionKey<SSelectApi<any>> = Symbol('SSelect API')

export function useSSelectApi<T = any>(): SSelectApi<T> {
  const val = inject(S_SELECT_API_KEY)
  if (!val) {
    throw new Error('Injection failed; You should use this only inside of the SSelectBase component')
  }
  return val
}
