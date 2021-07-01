import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SRow from './SRow.vue'

SRow.install = function (vue: VueConstructor) {
  vue.component(Components.SRow, SRow)
}

export { SRow }
