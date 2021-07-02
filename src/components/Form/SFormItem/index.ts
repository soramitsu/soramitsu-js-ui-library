import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SFormItem from './SFormItem.vue'

const SFormItem = _SFormItem as SFCWithInstall<typeof _SFormItem>

SFormItem.install = function (vue: VueConstructor) {
  vue.component(Components.SFormItem, SFormItem)
}

export { SFormItem }
export default SFormItem
