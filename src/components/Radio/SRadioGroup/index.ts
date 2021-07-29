import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SRadioGroup from './SRadioGroup.vue'

const SRadioGroup = _SRadioGroup as SFCWithInstall<typeof _SRadioGroup>

SRadioGroup.install = install(Components.SRadioGroup, SRadioGroup)

export { SRadioGroup }
export default SRadioGroup
