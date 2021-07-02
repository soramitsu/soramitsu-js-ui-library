import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _SCheckbox from './SCheckbox.vue'

const SCheckbox = _SCheckbox as SFCWithInstall<typeof _SCheckbox>

SCheckbox.install = function (vue: VueConstructor) {
  vue.component(Components.SCheckbox, SCheckbox)
}

export { SCheckbox }
export default SCheckbox
