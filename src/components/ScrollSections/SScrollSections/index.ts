import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SScrollSections from './SScrollSections.vue'

const SScrollSections = _SScrollSections as SFCWithInstall<typeof _SScrollSections>

SScrollSections.install = function (vue: VueConstructor) {
  vue.component(Components.SScrollSections, SScrollSections)
}

export { SScrollSections }
export default SScrollSections
