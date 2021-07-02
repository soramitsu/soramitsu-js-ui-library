import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SAside from './SAside.vue'

const SAside = _SAside as SFCWithInstall<typeof _SAside>

SAside.install = function (vue: VueConstructor) {
  vue.component(Components.SAside, SAside)
}

export { SAside }
export default SAside
