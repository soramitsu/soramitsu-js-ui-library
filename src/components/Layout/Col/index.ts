import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SCol from './SCol.vue'

SCol.install = function (vue: VueConstructor) {
  vue.component(Components.SCol, SCol)
}

export { SCol }
