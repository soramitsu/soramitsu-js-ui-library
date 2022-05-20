import { InjectionKey, inject, Ref } from 'vue'
import { forceInject } from '@/util'

export interface MenuApi {
  select: (index: string) => void
  active: Ref<string>
  collapsed: Ref<boolean>
}

export interface SubmenuApi {
  register: (index: string) => void
  unregister: (index: string) => void
}

export const MENU_API_KEY: InjectionKey<MenuApi> = Symbol('MenuAPI')
export const SUBMENU_API_KEY: InjectionKey<SubmenuApi | undefined> = Symbol('SubmenuAPI')

export const useMenuApi = () => forceInject(MENU_API_KEY)
export const useSubmenuApi = () => inject(SUBMENU_API_KEY, undefined)
