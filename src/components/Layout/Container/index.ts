import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SContainer from './SContainer.vue'

const SContainer = _SContainer as SFCWithInstall<typeof _SContainer>

SContainer.install = install(Components.SContainer, SContainer)

export { SContainer }
export { ContainerDirection } from './consts'
export default SContainer
