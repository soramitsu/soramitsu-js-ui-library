import { Components, SFCWithInstall } from '../../types/components'
import install from '../../utils/install'

import _SDialog from './SDialog.vue'

const SDialog = _SDialog as SFCWithInstall<typeof _SDialog>

SDialog.install = install(Components.SDialog, SDialog)

export { SDialog }
export default SDialog
