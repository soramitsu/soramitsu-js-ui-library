import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SIcon from './SIcon.vue'
import { Icons16, Icons24 } from './consts'

SIcon.install = function (vue: VueConstructor) {
  vue.component(Components.SIcon, SIcon)
}

export { SIcon, Icons16, Icons24 }
