import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SCol from './SCol.vue'

const SCol = _SCol as SFCWithInstall<typeof _SCol>

SCol.install = function (vue: VueConstructor) {
  vue.component(Components.SCol, SCol)
}

export { SCol }
export default SCol
