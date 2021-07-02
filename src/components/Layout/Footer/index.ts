import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SFooter from './SFooter.vue'

const SFooter = _SFooter as SFCWithInstall<typeof _SFooter>

SFooter.install = function (vue: VueConstructor) {
  vue.component(Components.SFooter, SFooter)
}

export { SFooter }
export default SFooter
