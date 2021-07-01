import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SInput from './SInput.vue'
import SFloatInput from './SFloatInput.vue'
import SJsonInput from './SJsonInput.vue'

import { Autocomplete, InputType, InputSize } from './consts'

SInput.install = function (vue: VueConstructor) {
  vue.component(Components.SInput, SInput)
}

SFloatInput.install = function (vue: VueConstructor) {
  vue.component(Components.SFloatInput, SFloatInput)
}

SJsonInput.install = function (vue: VueConstructor) {
  vue.component(Components.SJsonInput, SJsonInput)
}

export { SInput, SFloatInput, SJsonInput, Autocomplete, InputType, InputSize }
