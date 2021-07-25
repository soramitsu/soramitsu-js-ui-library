import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _SCheckbox from './SCheckbox.vue'

const SCheckbox = _SCheckbox as SFCWithInstall<typeof _SCheckbox>

SCheckbox.install = install(Components.SCheckbox, SCheckbox)

export { SCheckbox }
export default SCheckbox
