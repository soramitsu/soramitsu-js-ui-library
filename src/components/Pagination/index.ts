import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SPagination from './SPagination.vue'

SPagination.install = function (vue: VueConstructor) {
  vue.component(Components.SPagination, SPagination)
}

export { SPagination }
