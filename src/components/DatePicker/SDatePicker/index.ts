import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SDatePicker from './SDatePicker.vue'

const SDatePicker = _SDatePicker as SFCWithInstall<typeof _SDatePicker>

SDatePicker.install = install(Components.SDatePicker, SDatePicker)

export { SDatePicker }
export default SDatePicker
