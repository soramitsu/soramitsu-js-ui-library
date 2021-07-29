import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _STooltip from './STooltip.vue'

const STooltip = _STooltip as SFCWithInstall<typeof _STooltip>

STooltip.install = install(Components.STooltip, STooltip)

export { STooltip }
export { TooltipTheme, TooltipPlacement } from './consts'
export default STooltip
