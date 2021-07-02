import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SDropdownItem from './SDropdownItem.vue'

const SDropdownItem = _SDropdownItem as SFCWithInstall<typeof _SDropdownItem>

SDropdownItem.install = function (vue: VueConstructor) {
  vue.component(Components.SDropdownItem, SDropdownItem)
}

export { SDropdownItem }
export default SDropdownItem
