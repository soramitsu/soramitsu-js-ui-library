import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SBreadcrumbItem from './SBreadcrumbItem.vue'

const SBreadcrumbItem = _SBreadcrumbItem as SFCWithInstall<typeof _SBreadcrumbItem>

SBreadcrumbItem.install = install(Components.SBreadcrumbItem, SBreadcrumbItem)

export { SBreadcrumbItem }
export default SBreadcrumbItem
