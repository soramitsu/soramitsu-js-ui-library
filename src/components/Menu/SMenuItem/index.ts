import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SMenuItem from './SMenuItem.vue'

const SMenuItem = _SMenuItem as SFCWithInstall<typeof _SMenuItem>

SMenuItem.install = function (vue: VueConstructor) {
  vue.component(Components.SMenuItem, SMenuItem)
}

export { SMenuItem }
export default SMenuItem
