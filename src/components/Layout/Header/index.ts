import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SHeader from './SHeader.vue'

const SHeader = _SHeader as SFCWithInstall<typeof _SHeader>

SHeader.install = function (vue: VueConstructor) {
  vue.component(Components.SHeader, SHeader)
}

export { SHeader }
export default SHeader
