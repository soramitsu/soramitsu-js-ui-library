import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SSelect from './SSelect.vue'
import SOption from './SOption.vue'
import SOptionGroup from './SOptionGroup.vue'
import { InputTypes } from './consts'

SSelect.install = function (vue: VueConstructor) {
  vue.component(Components.SSelect, SSelect)
}

SOption.install = function (vue: VueConstructor) {
  vue.component(Components.SOption, SOption)
}

SOptionGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SOptionGroup, SOptionGroup)
}

export { SSelect, SOption, SOptionGroup, InputTypes }
