import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SInput from './SInput.vue'

const SInput = _SInput as SFCWithInstall<typeof _SInput>

SInput.install = function (vue: VueConstructor) {
  vue.component(Components.SInput, SInput)
}

export { SInput }
export default SInput
