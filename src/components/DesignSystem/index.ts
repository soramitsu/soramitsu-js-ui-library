import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import SDesignSystemProvider from './SDesignSystemProvider.vue'
import DesignSystemInject from './DesignSystemInject'
import { DesignSystemProvideKey } from './consts'

SDesignSystemProvider.install = function (vue: VueConstructor) {
  vue.component(Components.SDesignSystemProvider, SDesignSystemProvider)
}

export {
  SDesignSystemProvider,
  DesignSystemProvideKey,
  DesignSystemInject
}
