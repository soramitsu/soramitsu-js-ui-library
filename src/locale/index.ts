import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { Locale } from '../utils/Locale'

import en from './en'
import ja from './ja'

Vue.use(VueI18n)

const messages = {
  en,
  ja
}

const i18n = new VueI18n({
  locale: Locale.EN,
  messages
})

export default i18n
