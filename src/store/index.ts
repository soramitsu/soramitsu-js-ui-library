import Vue from 'vue'
import Vuex from 'vuex'

import Theme from './Theme'

const modules = {
  Theme
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
  Theme = 'Theme'
}

export default store
