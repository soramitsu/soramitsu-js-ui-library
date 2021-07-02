import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _SSlider from './SSlider.vue'

const SSlider = _SSlider as SFCWithInstall<typeof _SSlider>

SSlider.install = function (vue: VueConstructor) {
  vue.component(Components.SSlider, SSlider)
}

export { SSlider }
export { SliderInputSize } from './consts'
export default SSlider
