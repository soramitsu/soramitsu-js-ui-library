import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SJsonInput from './SJsonInput.vue'

const SJsonInput = _SJsonInput as SFCWithInstall<typeof _SJsonInput>

SJsonInput.install = install(Components.SJsonInput, SJsonInput)

export { SJsonInput }
export default SJsonInput
