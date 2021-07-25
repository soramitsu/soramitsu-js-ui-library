import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SMain from './SMain.vue'

const SMain = _SMain as SFCWithInstall<typeof _SMain>

SMain.install = install(Components.SMain, SMain)

export { SMain }
export default SMain
