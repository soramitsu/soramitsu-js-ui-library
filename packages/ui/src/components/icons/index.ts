import type { Component } from 'vue'
import { Status } from '@/types'

// This module is a proxy to soramitsu brand icons

import IconClose from '@soramitsu-ui/icons/icomoon/basic-close-24.svg'
import IconStatusSuccess from '@soramitsu-ui/icons/icomoon/basic-circle-checked-24.svg'
import IconStatusInfo from '@soramitsu-ui/icons/icomoon/notifications-info-24.svg'
import IconStatusWarning from '@soramitsu-ui/icons/icomoon/notifications-alert-triangle-24.svg'
import IconStatusError from '@soramitsu-ui/icons/icomoon/notifications-x-octagon-24.svg'

export { IconClose, IconStatusError, IconStatusWarning, IconStatusSuccess, IconStatusInfo }

export const STATUS_ICONS_MAP: { [K in Status]: Component } = {
  [Status.Info]: IconStatusInfo,
  [Status.Warning]: IconStatusWarning,
  [Status.Error]: IconStatusError,
  [Status.Success]: IconStatusSuccess,
}
