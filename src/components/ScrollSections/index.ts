import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SScrollSectionItem from './SScrollSectionItem.vue'
import SScrollSections from './SScrollSections.vue'

SScrollSectionItem.install = function (vue: VueConstructor) {
  vue.component(Components.SScrollSectionItem, SScrollSectionItem)
}

SScrollSections.install = function (vue: VueConstructor) {
  vue.component(Components.SScrollSections, SScrollSections)
}

export { SScrollSectionItem, SScrollSections }
