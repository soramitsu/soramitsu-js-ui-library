import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SBreadcrumb from './SBreadcrumb.vue'

const SBreadcrumb = _SBreadcrumb as SFCWithInstall<typeof _SBreadcrumb>

SBreadcrumb.install = install(Components.SBreadcrumb, SBreadcrumb)

export { SBreadcrumb }
export default SBreadcrumb
