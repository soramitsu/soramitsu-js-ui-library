import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SMain from './SMain.vue'

const SMain = _SMain as SFCWithInstall<typeof _SMain>

SMain.install = function (vue: VueConstructor) {
  vue.component(Components.SMain, SMain)
}

export { SMain }
export default SMain
