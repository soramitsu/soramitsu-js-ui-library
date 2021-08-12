import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SSkeleton from './SSkeleton.vue'

const SSkeleton = _SSkeleton as SFCWithInstall<typeof _SSkeleton>

SSkeleton.install = install(Components.SSkeleton, SSkeleton)

export { SSkeleton }
export default SSkeleton
