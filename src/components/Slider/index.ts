import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _SSlider from './SSlider.vue'

const SSlider = _SSlider as SFCWithInstall<typeof _SSlider>

SSlider.install = install(Components.SSlider, SSlider)

export { SSlider }
export { SliderInputSize } from './consts'
export default SSlider
