import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import STooltip from './STooltip.vue'
import { TooltipTheme, TooltipPlacement } from './consts'

STooltip.install = function (vue: VueConstructor) {
  vue.component(Components.STooltip, STooltip)
}

export { STooltip, TooltipPlacement, TooltipTheme }
