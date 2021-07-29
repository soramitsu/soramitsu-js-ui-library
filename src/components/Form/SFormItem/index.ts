import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SFormItem from './SFormItem.vue'

const SFormItem = _SFormItem as SFCWithInstall<typeof _SFormItem>

SFormItem.install = install(Components.SFormItem, SFormItem)

export { SFormItem }
export default SFormItem
