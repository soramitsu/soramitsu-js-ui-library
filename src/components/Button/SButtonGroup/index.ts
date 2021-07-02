import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SButtonGroup from './SButtonGroup.vue'

const SButtonGroup = _SButtonGroup as SFCWithInstall<typeof _SButtonGroup>

SButtonGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SButtonGroup, SButtonGroup)
}

export { SButtonGroup }
export default SButtonGroup
