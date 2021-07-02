import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SApp from './SApp.vue'

const SApp = _SApp as SFCWithInstall<typeof _SApp>

SApp.install = function (vue: VueConstructor) {
  vue.component(Components.SApp, SApp)
}

export { SApp }
export default SApp
