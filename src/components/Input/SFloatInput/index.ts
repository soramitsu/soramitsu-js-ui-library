import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SFloatInput from './SFloatInput.vue'

SFloatInput.install = function (vue: VueConstructor) {
  vue.component(Components.SFloatInput, SFloatInput)
}

export { SFloatInput }
export default SFloatInput
