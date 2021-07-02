import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SOption from './SOption.vue'

const SOption = _SOption as SFCWithInstall<typeof _SOption>

SOption.install = function (vue: VueConstructor) {
  vue.component(Components.SOption, SOption)
}

export { SOption }
export default SOption
