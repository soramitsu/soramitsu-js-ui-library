import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SScrollSectionItem from './SScrollSectionItem.vue'

const SScrollSectionItem = _SScrollSectionItem as SFCWithInstall<typeof _SScrollSectionItem>

SScrollSectionItem.install = install(Components.SScrollSectionItem, SScrollSectionItem)

export { SScrollSectionItem }
export default SScrollSectionItem
