import { VueConstructor } from 'vue'
import { Components } from '../../../types/components'

import SMain from './SMain.vue'

SMain.install = function (vue: VueConstructor) {
  vue.component(Components.SMain, SMain)
}

export { SMain }
