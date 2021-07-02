import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SScrollSectionItem from './SScrollSectionItem.vue'

const SScrollSectionItem = _SScrollSectionItem as SFCWithInstall<typeof _SScrollSectionItem>

SScrollSectionItem.install = function (vue: VueConstructor) {
  vue.component(Components.SScrollSectionItem, SScrollSectionItem)
}

export { SScrollSectionItem }
export default SScrollSectionItem
