import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SFooter from './SFooter.vue'

SFooter.install = function (vue: VueConstructor) {
  vue.component(Components.SFooter, SFooter)
}

export { SFooter }
