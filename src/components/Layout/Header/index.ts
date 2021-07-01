import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SHeader from './SHeader.vue'

SHeader.install = function (vue: VueConstructor) {
  vue.component(Components.SHeader, SHeader)
}

export { SHeader }
