import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SDatePicker from './SDatePicker.vue'
import { PickerTypes, PickerAlignment, InputTypes } from './consts'

SDatePicker.install = function (vue: VueConstructor) {
  vue.component(Components.SDatePicker, SDatePicker)
}

export {
  SDatePicker,
  PickerTypes,
  PickerAlignment,
  InputTypes
}
