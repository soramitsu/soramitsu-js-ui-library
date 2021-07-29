import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SFloatInput from './SFloatInput.vue'

const SFloatInput = _SFloatInput as SFCWithInstall<typeof _SFloatInput>

SFloatInput.install = install(Components.SFloatInput, SFloatInput)

export { SFloatInput }
export default SFloatInput
