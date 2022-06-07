import type { Component } from 'vue'
import { Status } from '@/types'

// This module is a proxy to soramitsu brand icons

import IconClose from '@soramitsu-ui/icons/icomoon/basic-close-24.svg'
import IconStatusSuccess from '@soramitsu-ui/icons/icomoon/basic-circle-checked-24.svg'
import IconStatusInfo from '@soramitsu-ui/icons/icomoon/notifications-info-24.svg'
import IconStatusWarning from '@soramitsu-ui/icons/icomoon/notifications-alert-triangle-24.svg'
import IconStatusError from '@soramitsu-ui/icons/icomoon/notifications-x-octagon-24.svg'

// Warning16 icon is missing :<
// I've picked the most similar icon instead of it
// FIXME
import IconStatusWarning16 from '~icons/ri/alert-fill'

import IconStatusSuccess16 from '@soramitsu-ui/icons/icomoon/status-success-clr-16.svg'
import IconStatusError16 from '@soramitsu-ui/icons/icomoon/status-error-ic-16.svg'

import IconBasicEye24 from '@soramitsu-ui/icons/icomoon/basic-eye-24.svg'
import IconBasicEyeNo24 from '@soramitsu-ui/icons/icomoon/basic-eye-no-24.svg'

import IconArrowsChevronDownRounded24 from '@soramitsu-ui/icons/icomoon/arrows-chevron-down-rounded-24.svg'
import IconArrowsChevronRight24 from '@soramitsu-ui/icons/icomoon/arrows-chevron-right-24.svg'
import IconArrowsChevronLeft24 from '@soramitsu-ui/icons/icomoon/arrows-chevron-left-24.svg'
import IconArrowsChevronBottom24 from '@soramitsu-ui/icons/icomoon/arrows-chevron-bottom-24.svg'
import IconBasicCheckMark24 from '@soramitsu-ui/icons/icomoon/basic-check-mark-24.svg'


export {
  IconClose,
  IconStatusError,
  IconStatusWarning,
  IconStatusSuccess,
  IconStatusInfo,
  IconStatusError16,
  IconStatusSuccess16,
  IconStatusWarning16,
  IconBasicEye24,
  IconBasicEyeNo24,
  IconArrowsChevronDownRounded24,
  IconArrowsChevronRight24,
  IconArrowsChevronLeft24,
  IconBasicCheckMark24,
  IconArrowsChevronBottom24
}

export const STATUS_ICONS_MAP: { [K in Status]: Component } = {
  [Status.Info]: IconStatusInfo,
  [Status.Warning]: IconStatusWarning,
  [Status.Error]: IconStatusError,
  [Status.Success]: IconStatusSuccess,
}

/**
 * TODO append info icon? For now it is used only in STextField that doesn't
 * need "info" entry here
 */
export const STATUS_ICONS_MAP_16: { [K in Exclude<Status, Status.Info>]: Component } = {
  [Status.Warning]: IconStatusWarning16,
  [Status.Error]: IconStatusError16,
  [Status.Success]: IconStatusSuccess16,
}
