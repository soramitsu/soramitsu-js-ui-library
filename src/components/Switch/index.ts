import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _SSwitch from './SSwitch.vue'

const SSwitch = _SSwitch as SFCWithInstall<typeof _SSwitch>

SSwitch.install = function (vue: VueConstructor) {
  vue.component(Components.SSwitch, SSwitch)
}

export { SSwitch }
export default SSwitch
