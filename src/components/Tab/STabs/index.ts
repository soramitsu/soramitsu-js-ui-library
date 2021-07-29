import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _STabs from './STabs.vue'

const STabs = _STabs as SFCWithInstall<typeof _STabs>

STabs.install = install(Components.STabs, STabs)

export { STabs }
export default STabs
