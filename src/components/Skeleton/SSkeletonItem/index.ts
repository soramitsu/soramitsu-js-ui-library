import { Components, SFCWithInstall } from '../../../types/components'
import install from '../../../utils/install'

import _SSkeletonItem from './SSkeletonItem.vue'

const SSkeletonItem = _SSkeletonItem as SFCWithInstall<typeof _SSkeletonItem>

SSkeletonItem.install = install(Components.SSkeleton, SSkeletonItem)

export { SSkeletonItem }
export default SSkeletonItem
