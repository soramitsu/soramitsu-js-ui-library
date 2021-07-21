import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'

import { Locale } from '../utils/Locale'
import i18n from '../locale'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'SET_LOCALE'
  ]),
  map(x => [x, x]),
  fromPairs
)([])

type State = {
  locale: Locale;
}

function initialState (): State {
  return {
    locale: Locale.EN
  }
}

const state = initialState()

const getters = {
  libraryLocale (state: State) {
    return state.locale
  }
}

const mutations = {
  [types.SET_LOCALE] (state: State, locale: Locale) {
    state.locale = locale
    i18n.locale = locale
  }
}

const actions = {
  setLocale ({ commit }, locale: Locale) {
    commit(types.SET_LOCALE, locale)
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
