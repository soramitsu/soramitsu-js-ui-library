import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SInput from './SInput.vue'

SInput.install = function (vue: VueConstructor) {
  vue.component(Components.SInput, SInput)
}

export { SInput }
export default SInput
