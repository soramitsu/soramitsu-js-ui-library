import Vue from 'vue'
import { TabPane } from 'element-ui'

import STabs from './STabs.vue'
import { TabsType, TabsPosition } from './consts'

const STab = Vue.component('STab', TabPane)

export { STab, STabs, TabsType, TabsPosition }
