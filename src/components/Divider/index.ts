import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SDivider from './SDivider.vue'
import { ContentPosition, DividerType, DividerDirection } from './consts'

SDivider.install = function (vue: VueConstructor) {
  vue.component(Components.SDivider, SDivider)
}

export { SDivider, ContentPosition, DividerDirection, DividerType }
