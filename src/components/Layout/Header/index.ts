import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SHeader from './SHeader.vue'

const SHeader = _SHeader as SFCWithInstall<typeof _SHeader>

SHeader.install = install(Components.SHeader, SHeader)

export { SHeader }
export default SHeader
