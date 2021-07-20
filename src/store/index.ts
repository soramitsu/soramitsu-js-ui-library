import Vue from 'vue'
import Vuex from 'vuex'

import LibraryTheme from './LibraryTheme'
import LibraryLocale from './LibraryLocale'

const modules = {
  LibraryTheme,
  LibraryLocale
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
  LibraryTheme = 'LibraryTheme',
  LibraryLocale = 'LibraryLocale'
}

export default store
