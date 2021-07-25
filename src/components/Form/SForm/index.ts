import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SForm from './SForm.vue'

const SForm = _SForm as SFCWithInstall<typeof _SForm>

SForm.install = install(Components.SForm, SForm)

export { SForm }
export default SForm
