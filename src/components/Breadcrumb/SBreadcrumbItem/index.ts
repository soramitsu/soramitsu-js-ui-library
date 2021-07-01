import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SBreadcrumbItem from './SBreadcrumbItem.vue'

SBreadcrumbItem.install = function (vue: VueConstructor) {
  vue.component(Components.SBreadcrumbItem, SBreadcrumbItem)
}

export { SBreadcrumbItem }
export default SBreadcrumbItem
