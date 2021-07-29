import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _STableColumn from './STableColumn.vue'

const STableColumn = _STableColumn as SFCWithInstall<typeof _STableColumn>

STableColumn.install = install(Components.STableColumn, STableColumn)

export { STableColumn }
export default STableColumn
