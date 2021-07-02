import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SDropdown from './SDropdown.vue'

const SDropdown = _SDropdown as SFCWithInstall<typeof _SDropdown>

SDropdown.install = function (vue: VueConstructor) {
  vue.component(Components.SDropdown, SDropdown)
}

export { SDropdown }
export default SDropdown
