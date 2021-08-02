import store from '../store'
import Theme from '../types/Theme'
import DesignSystem from '../types/DesignSystem'
import Locale from '../types/Locale'

export const setTheme = async (theme?: Theme) => {
  await store.dispatch('setTheme', theme)
}

export const setDesignSystem = async (designSystem: DesignSystem) => {
  await store.dispatch('setDesignSystem', designSystem)
}

export const setLocale = async (locale: Locale) => {
  await store.dispatch('setLocale', locale)
}
