import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SDropdown from './SDropdown.vue'

const SDropdown = _SDropdown as SFCWithInstall<typeof _SDropdown>

SDropdown.install = install(Components.SDropdown, SDropdown)

export { SDropdown }
export default SDropdown
