import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SCol from './SCol.vue'

const SCol = _SCol as SFCWithInstall<typeof _SCol>

SCol.install = install(Components.SCol, SCol)

export { SCol }
export default SCol
