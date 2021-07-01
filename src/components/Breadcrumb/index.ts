import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SBreadcrumb from './SBreadcrumb.vue'
import SBreadcrumbItem from './SBreadcrumbItem.vue'

SBreadcrumb.install = function (vue: VueConstructor) {
  vue.component(Components.SBreadcrumb, SBreadcrumb)
}

SBreadcrumbItem.install = function (vue: VueConstructor) {
  vue.component(Components.SBreadcrumbItem, SBreadcrumbItem)
}

export { SBreadcrumb, SBreadcrumbItem }
