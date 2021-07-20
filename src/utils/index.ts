import store from '../store'
import { Theme } from './Theme'
import { DesignSystem } from './DesignSystem'
import { Locale } from './Locale'

export const setTheme = (theme: Theme) => {
  store.dispatch('changeTheme', { theme })
}

export const setDesignSystem = (designSystem: DesignSystem) => {
  store.dispatch('setDesignSystem', designSystem)
}

export const setLocale = (locale: Locale) => {
  store.dispatch('setLocale', locale)
}
