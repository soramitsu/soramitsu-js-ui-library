import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SIcon from './SIcon.vue'

const SIcon = _SIcon as SFCWithInstall<typeof _SIcon>

SIcon.install = function (vue: VueConstructor) {
  vue.component(Components.SIcon, SIcon)
}

export { SIcon }
export default SIcon
