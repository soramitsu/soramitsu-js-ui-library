import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import { TabPane } from 'element-ui'

const STab = TabPane as SFCWithInstall<typeof TabPane>

STab.install = function (vue: VueConstructor) {
  vue.component(Components.STab, STab)
}

export { STab }
export default STab
