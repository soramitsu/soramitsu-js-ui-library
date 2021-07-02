import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SFloatInput from './SFloatInput.vue'

const SFloatInput = _SFloatInput as SFCWithInstall<typeof _SFloatInput>

SFloatInput.install = function (vue: VueConstructor) {
  vue.component(Components.SFloatInput, SFloatInput)
}

export { SFloatInput }
export default SFloatInput
