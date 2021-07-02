import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _SPagination from './SPagination.vue'

const SPagination = _SPagination as SFCWithInstall<typeof _SPagination>

SPagination.install = function (vue: VueConstructor) {
  vue.component(Components.SPagination, SPagination)
}

export { SPagination }
export default SPagination
