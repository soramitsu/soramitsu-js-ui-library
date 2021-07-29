import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _SScrollbar from './SScrollbar.vue'

const SScrollbar = _SScrollbar as SFCWithInstall<typeof _SScrollbar>

SScrollbar.install = install(Components.SScrollbar, SScrollbar)

export { SScrollbar }
export default SScrollbar
