import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _STable from './STable.vue'

const STable = _STable as SFCWithInstall<typeof _STable>

STable.install = function (vue: VueConstructor) {
  vue.component(Components.STable, STable)
}

export { STable }
export default STable
