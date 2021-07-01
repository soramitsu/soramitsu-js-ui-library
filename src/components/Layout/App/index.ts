import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SApp from './SApp.vue'

SApp.install = function (vue: VueConstructor) {
  vue.component(Components.SApp, SApp)
}

export { SApp }
