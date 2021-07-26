import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SScrollSections from './SScrollSections.vue'

const SScrollSections = _SScrollSections as SFCWithInstall<typeof _SScrollSections>

SScrollSections.install = install(Components.SScrollSections, SScrollSections)

export { SScrollSections }
export default SScrollSections
