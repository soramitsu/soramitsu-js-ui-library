import Vue from 'vue'
import Vuex from 'vuex'

import Theme from './Theme'
import Locale from './Locale'

const modules = {
  Theme,
  Locale
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
  Theme = 'Theme',
  Locale = 'Locale'
}

export default store
