import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SMenuItemGroup from './SMenuItemGroup.vue'

const SMenuItemGroup = _SMenuItemGroup as SFCWithInstall<typeof _SMenuItemGroup>

SMenuItemGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SMenuItemGroup, SMenuItemGroup)
}

export { SMenuItemGroup }
export default SMenuItemGroup
