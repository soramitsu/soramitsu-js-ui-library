import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SHierarchicalTable from './SHierarchicalTable.vue'

const SHierarchicalTable = _SHierarchicalTable as SFCWithInstall<typeof _SHierarchicalTable>

SHierarchicalTable.install = install(Components.SHierarchicalTable, SHierarchicalTable)

export { SHierarchicalTable }
export default SHierarchicalTable
