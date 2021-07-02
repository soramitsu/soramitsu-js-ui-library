import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SForm from './SForm.vue'

const SForm = _SForm as SFCWithInstall<typeof _SForm>

SForm.install = function (vue: VueConstructor) {
  vue.component(Components.SForm, SForm)
}

export { SForm }
export default SForm
