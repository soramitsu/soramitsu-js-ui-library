import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _SSwitch from './SSwitch.vue'

const SSwitch = _SSwitch as SFCWithInstall<typeof _SSwitch>

SSwitch.install = install(Components.SSwitch, SSwitch)

export { SSwitch }
export default SSwitch
