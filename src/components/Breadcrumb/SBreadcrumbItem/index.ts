import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SBreadcrumbItem from './SBreadcrumbItem.vue'

const SBreadcrumbItem = _SBreadcrumbItem as SFCWithInstall<typeof _SBreadcrumbItem>

SBreadcrumbItem.install = function (vue: VueConstructor) {
  vue.component(Components.SBreadcrumbItem, SBreadcrumbItem)
}

export { SBreadcrumbItem }
export default SBreadcrumbItem
