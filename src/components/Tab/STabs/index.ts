import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _STabs from './STabs.vue'

const STabs = _STabs as SFCWithInstall<typeof _STabs>

STabs.install = function (vue: VueConstructor) {
  vue.component(Components.STabs, STabs)
}

export { STabs }
export default STabs
