import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SIcon from './SIcon.vue'

const SIcon = _SIcon as SFCWithInstall<typeof _SIcon>

SIcon.install = install(Components.SIcon, SIcon)

export { SIcon }
export default SIcon
