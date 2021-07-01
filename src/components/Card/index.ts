import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SCard from './SCard.vue'
import { CardShadow } from './consts'

SCard.install = function (vue: VueConstructor) {
  vue.component(Components.SCard, SCard)
}

export { SCard, CardShadow }
