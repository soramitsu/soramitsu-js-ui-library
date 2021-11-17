import { forceInject } from '@/util'
import { InjectionKey } from 'vue'
import { FocusTrap } from 'focus-trap'

export interface SModalApi {
  close: () => void
  /**
   * It's `null` if focus trap was disabled in SModal props
   */
  focusTrap: null | FocusTrap
}

export const S_MODAL_API_KEY: InjectionKey<SModalApi> = Symbol('SModalApi')

export function useSModalApi(): SModalApi {
  return forceInject(S_MODAL_API_KEY)
}
