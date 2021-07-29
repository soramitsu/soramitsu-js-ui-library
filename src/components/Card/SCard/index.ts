import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SCard from './SCard.vue'

const SCard = _SCard as SFCWithInstall<typeof _SCard>

SCard.install = install(Components.SCard, SCard)

export { SCard }
export default SCard
