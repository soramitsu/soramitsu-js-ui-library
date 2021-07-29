import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SApp from './SApp.vue'

const SApp = _SApp as SFCWithInstall<typeof _SApp>

SApp.install = install(Components.SApp, SApp)

export { SApp }
export default SApp
