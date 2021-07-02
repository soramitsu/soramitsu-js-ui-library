import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SJsonInput from './SJsonInput.vue'

const SJsonInput = _SJsonInput as SFCWithInstall<typeof _SJsonInput>

SJsonInput.install = function (vue: VueConstructor) {
  vue.component(Components.SJsonInput, SJsonInput)
}

export { SJsonInput }
export default SJsonInput
