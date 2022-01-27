import { forceInject } from '@/util'
import { InjectionKey } from 'vue'
import { InjectData } from './types'

export interface STabPanelApi {
  readonly modelValue: number
  'update:modelValue': (num: number) => void
}

export interface STab {
  'border-radius'?: 'full' | 'none' | 'right' | 'left'
  disabled: boolean
}

export const STAB_PANEL_API_KEY: InjectionKey<STabPanelApi> = Symbol('STabPanelAPI')

export function useSTabPanelApi(): STabPanelApi {
  return forceInject(STAB_PANEL_API_KEY)
}

export const STAB_API_KEY: InjectionKey<STab> = Symbol('STabAPI')

export function useSTabApi(): STab {
  return forceInject(STAB_API_KEY)
}

export const tabsState: InjectionKey<InjectData> = Symbol('tabsState')
