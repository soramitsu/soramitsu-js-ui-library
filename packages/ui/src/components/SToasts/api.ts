import { InjectionKey, DeepReadonly, reactive, readonly, computed, Slot, FunctionalComponent } from 'vue'

export type UnregisterFn = () => void

export interface RegisterToastParams {
  slot: Slot | FunctionalComponent
}

export type RegisteredToast = RegisterToastParams

export type RegisterFn = (params: RegisterToastParams) => UnregisterFn

export interface ToastsApi {
  register: RegisterFn
  toasts: DeepReadonly<Array<[key: number, toast: RegisteredToast]>>
}

export const TOASTS_API_KEY: InjectionKey<ToastsApi> = Symbol('ToastsAPI')

export function defineToastsApi(): ToastsApi {
  const toastsMap = reactive(new Map<number, RegisteredToast>())
  let keysCounter = 0

  const register: RegisterFn = (params) => {
    const key = keysCounter++

    toastsMap.set(key, params)

    return () => {
      toastsMap.delete(key)
    }
  }

  const toasts = computed(() => [...toastsMap])

  return readonly({
    register,
    toasts,
  })
}
