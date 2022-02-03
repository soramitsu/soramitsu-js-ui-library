export * from './types'

export * from './components/Button'
export * from './components/Input'
export * from './components/Modal'
export * from './components/Select'
export * from './components/Notifications'
export * from './components/Toasts'
export * from './components/Alert'
export * from './components/Spinner'
export * from './components/Switch'
export * from './components/TextField'
export * from './components/Popover'
export * from './components/Badge'

import { Plugin } from 'vue'
import { SButton } from './components/Button'
import { SJsonInput, Autocomplete } from './components/Input'
import { SModal, SModalCard } from './components/Modal'
import { SSelect, SDropdown } from './components/Select'
import { SToastsDisplay, SToastsProvider } from './components/Toasts'
import { SNotificationBody, SNotificationsProvider, SUseNotification } from './components/Notifications'
import { SAlert } from './components/Alert'
import { SSpinner } from './components/Spinner'
import { SSwitch } from './components/Switch'
import { STextField } from './components/TextField'
import { SPopover, SPopoverWrappedTransition } from './components/Popover'
import { SBadge } from './components/Badge'

export function plugin(): Plugin {
  return (app) => {
    app.component('SButton', SButton)
    app.component('SJsonInput', SJsonInput)
    app.component('Autocomplete', Autocomplete)
    app.component('SSelect', SSelect)
    app.component('SDropdown', SDropdown)
    app.component('SModal', SModal)
    app.component('SModalCard', SModalCard)
    app.component('SToastsDisplay', SToastsDisplay)
    app.component('SToastsProvider', SToastsProvider)
    app.component('SNotificationBody', SNotificationBody)
    app.component('SNotificationsProvider', SNotificationsProvider)
    app.component('SUseNotification', SUseNotification)
    app.component('SAlert', SAlert)
    app.component('SSpinner', SSpinner)
    app.component('SSwitch', SSwitch)
    app.component('STextField', STextField)
    app.component('SPopover', SPopover)
    app.component('SPopoverWrappedTransition', SPopoverWrappedTransition)
    app.component('SBadge', SBadge)
  }
}
