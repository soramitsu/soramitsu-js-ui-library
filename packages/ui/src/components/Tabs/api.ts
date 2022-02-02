import { forceInject } from '@/util'
import { InjectionKey } from 'vue'
import { Ref } from 'vue'

export interface TabsState {
  active: Ref<number>
  tabs: Ref<any[]>
  selectTab: (tab: number) => void
}

export const TABS_STATE: InjectionKey<TabsState> = Symbol('tabsState')

export function useTabsStateApi(): TabsState {
  return forceInject(TABS_STATE)
}
