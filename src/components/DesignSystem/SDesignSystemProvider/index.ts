import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SDesignSystemProvider from './SDesignSystemProvider.vue'

const SDesignSystemProvider = _SDesignSystemProvider as SFCWithInstall<typeof _SDesignSystemProvider>

SDesignSystemProvider.install = install(Components.SDesignSystemProvider, SDesignSystemProvider)

export { SDesignSystemProvider }
export default SDesignSystemProvider
