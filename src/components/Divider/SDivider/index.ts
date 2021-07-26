import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SDivider from './SDivider.vue'

const SDivider = _SDivider as SFCWithInstall<typeof _SDivider>

SDivider.install = install(Components.SDivider, SDivider)

export { SDivider }
export default SDivider
