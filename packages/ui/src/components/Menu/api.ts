import { InjectionKey, inject, Ref } from 'vue'
import { forceInject } from '@/util'

export interface MenuApi {
  /**
   * Should be called inside item to select it
   */
  select: (index: string) => void
  active: Ref<string>
  collapsed: Ref<boolean>
}

export interface SubmenuApi {
  /**
   * Should be called inside item when created
   */
  register: (index: Ref<string>) => void
  /**
   * Should be called inside item when destroyed
   */
  unregister: (index: Ref<string>) => void
}

export const MENU_API_KEY: InjectionKey<MenuApi> = Symbol('MenuAPI')
export const SUBMENU_API_KEY: InjectionKey<SubmenuApi | undefined> = Symbol('SubmenuAPI')

export const useMenuApi = () => forceInject(MENU_API_KEY)
export const useSubmenuApi = () => inject(SUBMENU_API_KEY, undefined)
