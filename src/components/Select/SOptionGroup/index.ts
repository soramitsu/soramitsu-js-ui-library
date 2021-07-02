import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SOptionGroup from './SOptionGroup.vue'

const SOptionGroup = _SOptionGroup as SFCWithInstall<typeof _SOptionGroup>

SOptionGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SOptionGroup, SOptionGroup)
}

export { SOptionGroup }
export default SOptionGroup
