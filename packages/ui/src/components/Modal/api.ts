import { forceInject } from '@/util'
import { InjectionKey } from 'vue'
import { FocusTrap } from 'focus-trap'

export interface ModalApi {
  close: () => void
  /**
   * It's `null` if focus trap was disabled in SModal props
   */
  focusTrap: null | FocusTrap
}

export const MODAL_API_KEY: InjectionKey<ModalApi> = Symbol('ModalAPI')

export function useModalApi(): ModalApi {
  return forceInject(MODAL_API_KEY)
}
