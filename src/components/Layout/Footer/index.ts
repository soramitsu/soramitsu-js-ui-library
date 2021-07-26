import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SFooter from './SFooter.vue'

const SFooter = _SFooter as SFCWithInstall<typeof _SFooter>

SFooter.install = install(Components.SFooter, SFooter)

export { SFooter }
export default SFooter
