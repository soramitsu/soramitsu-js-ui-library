import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SContainer from './SContainer.vue'
import { ContainerDirection } from './consts'

SContainer.install = function (vue: VueConstructor) {
  vue.component(Components.SContainer, SContainer)
}

export { SContainer, ContainerDirection }
