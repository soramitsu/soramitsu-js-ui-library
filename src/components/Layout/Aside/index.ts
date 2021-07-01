import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SAside from './SAside.vue'

SAside.install = function (vue: VueConstructor) {
  vue.component(Components.SAside, SAside)
}

export { SAside }
