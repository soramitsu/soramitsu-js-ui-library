import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SSelect from './SSelect.vue'

const SSelect = _SSelect as SFCWithInstall<typeof _SSelect>

SSelect.install = function (vue: VueConstructor) {
  vue.component(Components.SSelect, SSelect)
}

export { SSelect }
export default SSelect
