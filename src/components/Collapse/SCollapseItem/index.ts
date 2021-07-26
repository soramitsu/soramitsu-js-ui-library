import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SCollapseItem from './SCollapseItem.vue'

const SCollapseItem = _SCollapseItem as SFCWithInstall<typeof _SCollapseItem>

SCollapseItem.install = install(Components.SCollapseItem, SCollapseItem)

export { SCollapseItem }
export default SCollapseItem
