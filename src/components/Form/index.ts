import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SForm from './SForm.vue'
import SFormItem from './SFormItem.vue'
import { LabelPosition, FormItemSize } from './consts'

SForm.install = function (vue: VueConstructor) {
  vue.component(Components.SForm, SForm)
}

SFormItem.install = function (vue: VueConstructor) {
  vue.component(Components.SFormItem, SFormItem)
}

export { SForm, SFormItem, LabelPosition, FormItemSize }
