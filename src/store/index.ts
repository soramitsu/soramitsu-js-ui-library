import Vue from 'vue'
import Vuex from 'vuex'

import UiTheme from './UiTheme'
import UiLocale from './UiLocale'

const modules = {
  UiTheme,
  UiLocale
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

export {
  modules
}

export enum Modules {
  UiTheme = 'UiTheme',
  UiLocale = 'UiLocale'
}

export default store
