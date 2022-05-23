import { InjectionKey, inject, Ref, DeepReadonly } from 'vue'
import { forceInject } from '@/util'

export interface NavigationMenuApi {
  /**
   * Should be called inside item to select it
   */
  select: (index: string) => void
  active: string
  collapsed: boolean
}

export interface NavigationSubmenuApi {
  /**
   * Should be called inside item when created
   */
  register: (index: Ref<string>) => void
  /**
   * Should be called inside item when destroyed
   */
  unregister: (index: Ref<string>) => void
}

export const NAVIGATION_MENU_API_KEY: InjectionKey<DeepReadonly<NavigationMenuApi>> = Symbol('NavigationMenuAPI')
export const NAVIGATION_SUBMENU_API_KEY: InjectionKey<DeepReadonly<NavigationSubmenuApi> | undefined> = Symbol('NavigationSubmenuAPI')

export const useNavigationMenuApi = () => forceInject(NAVIGATION_MENU_API_KEY)
export const useNavigationSubmenuApi = () => inject(NAVIGATION_SUBMENU_API_KEY, undefined)
