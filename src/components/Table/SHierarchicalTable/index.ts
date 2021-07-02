import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SHierarchicalTable from './SHierarchicalTable.vue'

const SHierarchicalTable = _SHierarchicalTable as SFCWithInstall<typeof _SHierarchicalTable>

SHierarchicalTable.install = function (vue: VueConstructor) {
  vue.component(Components.SHierarchicalTable, SHierarchicalTable)
}

export { SHierarchicalTable }
export default SHierarchicalTable
