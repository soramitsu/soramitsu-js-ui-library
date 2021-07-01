import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SSwitch from './SSwitch.vue'

SSwitch.install = function (vue: VueConstructor) {
  vue.component(Components.SSwitch, SSwitch)
}

export { SSwitch }
