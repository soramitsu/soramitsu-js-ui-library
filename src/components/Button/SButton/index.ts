import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SButton from './SButton.vue'

const SButton = _SButton as SFCWithInstall<typeof _SButton>

SButton.install = install(Components.SButton, SButton)

export { SButton }
export default SButton
