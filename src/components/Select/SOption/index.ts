import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SOption from './SOption.vue'

const SOption = _SOption as SFCWithInstall<typeof _SOption>

SOption.install = install(Components.SOption, SOption)

export { SOption }
export default SOption
