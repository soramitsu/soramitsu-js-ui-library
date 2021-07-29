import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import TabPane from 'element-ui/lib/tab-pane'

const STab = TabPane as SFCWithInstall<typeof TabPane>

STab.install = install(Components.STab, STab)

export { STab }
export default STab
