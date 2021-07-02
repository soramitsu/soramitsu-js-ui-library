import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SDivider from './SDivider.vue'

const SDivider = _SDivider as SFCWithInstall<typeof _SDivider>

SDivider.install = function (vue: VueConstructor) {
  vue.component(Components.SDivider, SDivider)
}

export { SDivider }
export default SDivider
