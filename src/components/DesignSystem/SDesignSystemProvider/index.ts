import { VueConstructor } from 'vue'
import { Components, SFCWithInstall } from '../../../types/components'

import _SDesignSystemProvider from './SDesignSystemProvider.vue'

const SDesignSystemProvider = _SDesignSystemProvider as SFCWithInstall<typeof _SDesignSystemProvider>

SDesignSystemProvider.install = function (vue: VueConstructor) {
  vue.component(Components.SDesignSystemProvider, SDesignSystemProvider)
}

export { SDesignSystemProvider }
export default SDesignSystemProvider
