import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SCheckbox from './SCheckbox.vue'

SCheckbox.install = function (vue: VueConstructor) {
  vue.component(Components.SCheckbox, SCheckbox)
}

export { SCheckbox }
