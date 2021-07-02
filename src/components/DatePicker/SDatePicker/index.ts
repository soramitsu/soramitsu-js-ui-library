import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SDatePicker from './SDatePicker.vue'

const SDatePicker = _SDatePicker as SFCWithInstall<typeof _SDatePicker>

SDatePicker.install = function (vue: VueConstructor) {
  vue.component(Components.SDatePicker, SDatePicker)
}

export { SDatePicker }
export default SDatePicker
