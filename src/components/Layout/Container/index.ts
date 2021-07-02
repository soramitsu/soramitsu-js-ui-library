import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SContainer from './SContainer.vue'

const SContainer = _SContainer as SFCWithInstall<typeof _SContainer>

SContainer.install = function (vue: VueConstructor) {
  vue.component(Components.SContainer, SContainer)
}

export { SContainer }
export { ContainerDirection } from './consts'
export default SContainer
