import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SMenuItem from './SMenuItem.vue'

const SMenuItem = _SMenuItem as SFCWithInstall<typeof _SMenuItem>

SMenuItem.install = install(Components.SMenuItem, SMenuItem)

export { SMenuItem }
export default SMenuItem
