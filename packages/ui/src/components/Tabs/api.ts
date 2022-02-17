import { forceInject } from '@/util'
import { InjectionKey } from 'vue'

export interface TabsPanelApi {
  active: string
  selectTab: (tab: string) => void
  background: string
}

export type BackgroundType = 'primary' | 'secondary' | 'none'

export enum BackgroundTypeValues {
  'primary',
  'secondary',
  'none',
}

export const TABS_PANEL_API_KEY: InjectionKey<TabsPanelApi> = Symbol('tabsState')

export function useTabsStateApi(): TabsPanelApi {
  return forceInject(TABS_PANEL_API_KEY)
}
