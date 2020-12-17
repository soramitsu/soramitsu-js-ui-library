import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'

import { Theme, Themes } from '../utils/Theme'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'CHANGE_THEME'
  ]),
  map(x => [x, x]),
  fromPairs
)([])

function initialState () {
  return {
    theme: Themes.LIGHT
  }
}

const state = initialState()

const getters = {
  libraryTheme (state) {
    return state.theme
  }
}

const mutations = {
  [types.CHANGE_THEME] (state, theme: Theme) {
    state.theme = theme
  }
}

const actions = {
  changeTheme ({ commit }, { theme }) {
    commit(types.CHANGE_THEME, theme)
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
