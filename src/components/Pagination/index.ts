import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _SPagination from './SPagination.vue'

const SPagination = _SPagination as SFCWithInstall<typeof _SPagination>

SPagination.install = install(Components.SPagination, SPagination)

export { SPagination }
export default SPagination
