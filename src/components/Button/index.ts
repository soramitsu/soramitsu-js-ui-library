import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SButton from './SButton.vue'
import SButtonGroup from './SButtonGroup.vue'
import { ButtonTypes, ButtonNativeTypes, ButtonIconPosition } from './consts'

SButton.install = function (vue: VueConstructor) {
  vue.component(Components.SButton, SButton)
}

SButtonGroup.install = function (vue: VueConstructor) {
  vue.component(Components.SButtonGroup, SButtonGroup)
}

export {
  SButton,
  SButtonGroup,
  ButtonTypes,
  ButtonNativeTypes,
  ButtonIconPosition
}
