import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SCollapse from './SCollapse.vue'
import SCollapseItem from './SCollapseItem.vue'
import { BorderTypes } from './consts'

SCollapse.install = function (vue: VueConstructor) {
  vue.component(Components.SCollapse, SCollapse)
}

SCollapseItem.install = function (vue: VueConstructor) {
  vue.component(Components.SCollapseItem, SCollapseItem)
}

export { SCollapse, SCollapseItem, BorderTypes }
