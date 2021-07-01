import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import { TabPane } from 'element-ui'

import STabs from './STabs.vue'
import { TabsType, TabsPosition } from './consts'

const STab = TabPane

STab.install = function (vue: VueConstructor) {
  vue.component(Components.STab, TabPane)
}

STabs.install = function (vue: VueConstructor) {
  vue.component(Components.STabs, STabs)
}

export { STab, STabs, TabsType, TabsPosition }
