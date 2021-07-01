import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SBreadcrumb from './SBreadcrumb.vue'

SBreadcrumb.install = function (vue: VueConstructor) {
  vue.component(Components.SBreadcrumb, SBreadcrumb)
}

export { SBreadcrumb }
export default SBreadcrumb
