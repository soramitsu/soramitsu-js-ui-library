import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'

import Theme from '../types/Theme'
import DesignSystem from '../types/DesignSystem'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'SET_THEME',
    'SWITCH_THEME',
    'SET_DESIGN_SYSTEM'
  ]),
  map(x => [x, x]),
  fromPairs
)([])

type State = {
  theme: Theme;
  designSystem: DesignSystem;
}

function initialState (): State {
  return {
    // "light" is set by default
    theme: localStorage.getItem('libraryTheme') as Theme || Theme.LIGHT,
    designSystem: DesignSystem.DEFAULT
  }
}

const state = initialState()

const getters = {
  libraryTheme (state: State) {
    return state.theme
  },
  libraryDesignSystem (state: State) {
    return state.designSystem
  }
}

const mutations = {
  [types.SET_THEME] (state: State, theme: Theme) {
    state.theme = theme
    localStorage.setItem('libraryTheme', theme)
  },
  [types.SWITCH_THEME] (state: State) {},
  [types.SET_DESIGN_SYSTEM] (state: State, designSystem: DesignSystem) {
    state.designSystem = designSystem
  }
}

const actions = {
  setTheme ({ commit, state: { theme } }, newTheme?: Theme) {
    const computedTheme = newTheme || theme
    if (!newTheme || theme !== newTheme) {
      commit(types.SET_THEME, computedTheme)
    }
    document.documentElement.setAttribute('design-system-theme', computedTheme)
  },
  async switchTheme ({ commit, state: { theme }, dispatch }) {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    commit(types.SWITCH_THEME)
    await dispatch('setTheme', newTheme)
  },
  setDesignSystem ({ commit }, designSystem: DesignSystem) {
    commit(types.SET_DESIGN_SYSTEM, designSystem)
    document.documentElement.setAttribute('design-system', designSystem)
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
