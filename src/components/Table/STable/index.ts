import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _STable from './STable.vue'

const STable = _STable as SFCWithInstall<typeof _STable>

STable.install = install(Components.STable, STable)

export { STable }
export default STable
