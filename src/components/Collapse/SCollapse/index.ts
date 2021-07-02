import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SCollapse from './SCollapse.vue'

const SCollapse = _SCollapse as SFCWithInstall<typeof _SCollapse>

SCollapse.install = function (vue: VueConstructor) {
  vue.component(Components.SCollapse, SCollapse)
}

export { SCollapse }
export default SCollapse
