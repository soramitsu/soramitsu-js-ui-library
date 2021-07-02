import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SRadio from './SRadio.vue'

const SRadio = _SRadio as SFCWithInstall<typeof _SRadio>

SRadio.install = function (vue: VueConstructor) {
  vue.component(Components.SRadio, SRadio)
}

export { SRadio }
export default SRadio
