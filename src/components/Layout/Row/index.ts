import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SRow from './SRow.vue'

const SRow = _SRow as SFCWithInstall<typeof _SRow>

SRow.install = install(Components.SRow, SRow)

export { SRow }
export default SRow
