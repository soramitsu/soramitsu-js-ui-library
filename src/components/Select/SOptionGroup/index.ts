import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SOptionGroup from './SOptionGroup.vue'

const SOptionGroup = _SOptionGroup as SFCWithInstall<typeof _SOptionGroup>

SOptionGroup.install = install(Components.SOptionGroup, SOptionGroup)

export { SOptionGroup }
export default SOptionGroup
