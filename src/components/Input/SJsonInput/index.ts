import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SJsonInput from './SJsonInput/SJsonInput.vue'

SJsonInput.install = function (vue: VueConstructor) {
  vue.component(Components.SJsonInput, SJsonInput)
}

export { SJsonInput }
export default SJsonInput
