import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SButtonGroup from './SButtonGroup.vue'

const SButtonGroup = _SButtonGroup as SFCWithInstall<typeof _SButtonGroup>

SButtonGroup.install = install(Components.SButtonGroup, SButtonGroup)

export { SButtonGroup }
export default SButtonGroup
