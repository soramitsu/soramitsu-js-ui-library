import store from '../store'
import { Theme } from './Theme'

export const setTheme = (theme: Theme) => {
  store.dispatch('changeTheme', { theme })
}
