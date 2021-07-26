import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SMenu from './SMenu.vue'

const SMenu = _SMenu as SFCWithInstall<typeof _SMenu>

SMenu.install = install(Components.SMenu, SMenu)

export { SMenu }
export default SMenu
