import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _SScrollbar from './SScrollbar.vue'

const SScrollbar = _SScrollbar as SFCWithInstall<typeof _SScrollbar>

SScrollbar.install = function (vue: VueConstructor) {
  vue.component(Components.SScrollbar, SScrollbar)
}

export { SScrollbar }
export default SScrollbar
