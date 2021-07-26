import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SDropdownItem from './SDropdownItem.vue'

const SDropdownItem = _SDropdownItem as SFCWithInstall<typeof _SDropdownItem>

SDropdownItem.install = install(Components.SDropdownItem, SDropdownItem)

export { SDropdownItem }
export default SDropdownItem
