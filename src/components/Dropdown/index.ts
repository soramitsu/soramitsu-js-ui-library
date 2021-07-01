import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SDropdown from './SDropdown.vue'
import SDropdownItem from './SDropdownItem.vue'
import { DropdownPlacement, DropdownTrigger, DropdownType } from './consts'

SDropdown.install = function (vue: VueConstructor) {
  vue.component(Components.SDropdown, SDropdown)
}

SDropdownItem.install = function (vue: VueConstructor) {
  vue.component(Components.SDropdownItem, SDropdownItem)
}

export {
  SDropdown,
  SDropdownItem,
  DropdownPlacement,
  DropdownTrigger,
  DropdownType
}
