import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SDialog from './SDialog.vue'

SDialog.install = function (vue: VueConstructor) {
  vue.component(Components.SDialog, SDialog)
}

export { SDialog }
