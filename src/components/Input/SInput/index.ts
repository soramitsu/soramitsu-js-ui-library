import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SInput from './SInput.vue'

const SInput = _SInput as SFCWithInstall<typeof _SInput>

SInput.install = install(Components.SInput, SInput)

export { SInput }
export default SInput
