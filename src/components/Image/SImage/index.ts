import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SImage from './SImage.vue'

const SImage = _SImage as SFCWithInstall<typeof _SImage>

SImage.install = install(Components.SImage, SImage)

export { SImage }
export default SImage
