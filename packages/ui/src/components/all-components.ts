// importing every component - for plugin & tests

// it is placed separately from the `index` file because
// `index` file is re-exported from the `lib` file, but there is
// no intention to expose `COMPONENTS` for the end user

import { Component } from 'vue'
import { SButton } from './Button'
import { SJsonInput } from './Input'
import { SModal, SModalCard } from './Modal'
import { SSelect, SDropdown, SSelectBase, SSelectButton, SSelectChevron, SSelectInput, SSelectOption } from './Select'
import { SToastsDisplay, SToastsProvider } from './Toasts'
import { SNotificationBody, SNotificationsProvider, SUseNotification } from './Notifications'
import { SAlert } from './Alert'
import { SSpinner } from './Spinner'
import { SSwitch } from './Switch'
import { STextField } from './TextField'
import { SPopover, SPopoverWrappedTransition } from './Popover'
import { STab, STabsPanel } from './Tabs'

/**
 * Component names should be identical to their variable names
 */
export const COMPONENTS: Record<string, Component> = {
  SButton,
  SJsonInput,
  SModal,
  SModalCard,
  SSelect,
  SDropdown,
  SSelectBase,
  SSelectButton,
  SSelectChevron,
  SSelectInput,
  SSelectOption,
  SToastsDisplay,
  SToastsProvider,
  SNotificationBody,
  SNotificationsProvider,
  SUseNotification,
  SAlert,
  SSpinner,
  SPopover,
  SPopoverWrappedTransition,
  SSwitch,
  STextField,
  STab,
  STabsPanel
}
