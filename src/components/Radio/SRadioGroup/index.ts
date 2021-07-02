import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SRadioGroup from './SRadioGroup.vue'

const SRadioGroup = _SRadioGroup as SFCWithInstall<typeof _SRadioGroup>

SRadioGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SRadioGroup, SRadioGroup)
}

export { SRadioGroup }
export default SRadioGroup
