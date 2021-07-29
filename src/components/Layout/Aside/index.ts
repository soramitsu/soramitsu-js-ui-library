import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SAside from './SAside.vue'

const SAside = _SAside as SFCWithInstall<typeof _SAside>

SAside.install = install(Components.SAside, SAside)

export { SAside }
export default SAside
