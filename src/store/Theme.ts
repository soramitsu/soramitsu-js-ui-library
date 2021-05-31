import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'

import { Theme, Themes } from '../utils/Theme'
import { DesignSystemTypes } from '../utils/DesignSystem'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'CHANGE_THEME',
    'SET_DESIGN_SYSTEM'
  ]),
  map(x => [x, x]),
  fromPairs
)([])

function initialState () {
  return {
    theme: Themes.LIGHT,
    designSystem: DesignSystemTypes.DEFAULT
  }
}

const state = initialState()

const getters = {
  libraryTheme (state) {
    return state.theme
  },
  libraryDesignSystem (state) {
    return state.designSystem
  }
}

const mutations = {
  [types.CHANGE_THEME] (state, theme: Theme) {
    state.theme = theme
  },
  [types.SET_DESIGN_SYSTEM] (state, designSystem: DesignSystemTypes) {
    state.designSystem = designSystem
  }
}

const actions = {
  changeTheme ({ commit }, { theme }) {
    commit(types.CHANGE_THEME, theme)
  },
  setDesignSystem ({ commit }, designSystem: DesignSystemTypes) {
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
