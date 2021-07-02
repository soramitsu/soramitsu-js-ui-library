import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SBreadcrumb from './SBreadcrumb.vue'

const SBreadcrumb = _SBreadcrumb as SFCWithInstall<typeof _SBreadcrumb>

SBreadcrumb.install = function (vue: VueConstructor) {
  vue.component(Components.SBreadcrumb, SBreadcrumb)
}

export { SBreadcrumb }
export default SBreadcrumb
