import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SRadio from './SRadio.vue'
import SRadioGroup from './SRadioGroup.vue'

SRadio.install = function (vue: VueConstructor) {
  vue.component(Components.SRadio, SRadio)
}

SRadioGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SRadioGroup, SRadioGroup)
}

export { SRadio, SRadioGroup }
