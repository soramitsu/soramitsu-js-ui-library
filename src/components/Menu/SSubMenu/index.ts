import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SSubMenu from './SSubmenu.vue'

const SSubmenu = _SSubMenu as SFCWithInstall<typeof _SSubMenu>

SSubmenu.install = install(Components.SSubmenu, SSubmenu)

export { SSubmenu }
export default SSubmenu
