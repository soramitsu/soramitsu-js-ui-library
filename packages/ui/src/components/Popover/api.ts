import { InjectionKey } from 'vue'
import { Instance } from '@popperjs/core'
import { forceInject } from '@/util'

export interface PopoverApi {
  /**
   * Should popper be shown
   */
  show: boolean
  /**
   * Current popper instance
   */
  popper: Instance | null
}

export const POPOVER_API_KEY: InjectionKey<PopoverApi> = Symbol('PopoverAPI')

export const usePopoverApi = () => forceInject(POPOVER_API_KEY)
