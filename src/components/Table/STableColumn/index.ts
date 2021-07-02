import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _STableColumn from './STableColumn.vue'

const STableColumn = _STableColumn as SFCWithInstall<typeof _STableColumn>

STableColumn.install = function (vue: VueConstructor) {
  vue.component(Components.STableColumn, STableColumn)
}

export { STableColumn }
export default STableColumn
