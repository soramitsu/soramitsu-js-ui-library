import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SMenu from './SMenu.vue'

const SMenu = _SMenu as SFCWithInstall<typeof _SMenu>

SMenu.install = function (vue: VueConstructor) {
  vue.component(Components.SMenu, SMenu)
}

export { SMenu }
export default SMenu
