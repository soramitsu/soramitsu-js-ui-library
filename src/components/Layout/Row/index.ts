import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SRow from './SRow.vue'

const SRow = _SRow as SFCWithInstall<typeof _SRow>

SRow.install = function (vue: VueConstructor) {
  vue.component(Components.SRow, SRow)
}

export { SRow }
export default SRow
