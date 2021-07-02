import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SSubMenu from './SSubmenu.vue'

const SSubmenu = _SSubMenu as SFCWithInstall<typeof _SSubMenu>

SSubmenu.install = function (vue: VueConstructor) {
  vue.component(Components.SSubmenu, SSubmenu)
}

export { SSubmenu }
export default SSubmenu
