import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../types/components'

import _SDialog from './SDialog.vue'

const SDialog = _SDialog as SFCWithInstall<typeof _SDialog>

SDialog.install = function (vue: VueConstructor) {
  vue.component(Components.SDialog, SDialog)
}

export { SDialog }
export default SDialog
