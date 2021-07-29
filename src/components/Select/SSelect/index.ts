import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SSelect from './SSelect.vue'

const SSelect = _SSelect as SFCWithInstall<typeof _SSelect>

SSelect.install = install(Components.SSelect, SSelect)

export { SSelect }
export default SSelect
