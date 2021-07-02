import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SButton from './SButton.vue'

const SButton = _SButton as SFCWithInstall<typeof _SButton>

SButton.install = function (vue: VueConstructor) {
  vue.component(Components.SButton, SButton)
}

export { SButton }
export default SButton
