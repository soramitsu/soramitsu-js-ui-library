import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SRadio from './SRadio.vue'

const SRadio = _SRadio as SFCWithInstall<typeof _SRadio>

SRadio.install = install(Components.SRadio, SRadio)

export { SRadio }
export default SRadio
