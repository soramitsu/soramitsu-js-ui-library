import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'

import { Theme } from '../utils/Theme'
import { DesignSystem } from '../utils/DesignSystem'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'CHANGE_THEME',
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
    theme: Theme.LIGHT,
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
  [types.CHANGE_THEME] (state: State, theme: Theme) {
    state.theme = theme
  },
  [types.SET_DESIGN_SYSTEM] (state: State, designSystem: DesignSystem) {
    state.designSystem = designSystem
  }
}

const actions = {
  changeTheme ({ commit }, { theme }) {
    commit(types.CHANGE_THEME, theme)
  },
  setDesignSystem ({ commit }, designSystem: DesignSystem) {
    commit(types.SET_DESIGN_SYSTEM, designSystem)
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
