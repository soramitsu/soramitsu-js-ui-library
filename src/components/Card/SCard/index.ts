import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SCard from './SCard.vue'

const SCard = _SCard as SFCWithInstall<typeof _SCard>

SCard.install = function (vue: VueConstructor) {
  vue.component(Components.SCard, SCard)
}

export { SCard }
export default SCard
