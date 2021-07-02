import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _STooltip from './STooltip.vue'

const STooltip = _STooltip as SFCWithInstall<typeof _STooltip>

STooltip.install = function (vue: VueConstructor) {
  vue.component(Components.STooltip, STooltip)
}

export { STooltip }
export { TooltipTheme, TooltipPlacement } from './consts'
export default STooltip
