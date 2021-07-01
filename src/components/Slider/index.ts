import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SSlider from './SSlider.vue'
import { SliderInputSize } from './consts'

SSlider.install = function (vue: VueConstructor) {
  vue.component(Components.SSlider, SSlider)
}

export { SSlider, SliderInputSize }
