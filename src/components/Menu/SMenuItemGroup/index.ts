import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SMenuItemGroup from './SMenuItemGroup.vue'

const SMenuItemGroup = _SMenuItemGroup as SFCWithInstall<typeof _SMenuItemGroup>

SMenuItemGroup.install = install(Components.SMenuItemGroup, SMenuItemGroup)

export { SMenuItemGroup }
export default SMenuItemGroup
