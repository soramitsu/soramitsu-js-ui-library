import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SCollapseItem from './SCollapseItem.vue'

const SCollapseItem = _SCollapseItem as SFCWithInstall<typeof _SCollapseItem>

SCollapseItem.install = function (vue: VueConstructor) {
  vue.component(Components.SCollapseItem, SCollapseItem)
}

export { SCollapseItem }
export default SCollapseItem
