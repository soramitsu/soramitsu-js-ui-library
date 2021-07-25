import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SCollapse from './SCollapse.vue'

const SCollapse = _SCollapse as SFCWithInstall<typeof _SCollapse>

SCollapse.install = install(Components.SCollapse, SCollapse)

export { SCollapse }
export default SCollapse
