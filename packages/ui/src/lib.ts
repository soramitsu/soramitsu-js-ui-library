export * from './types'

export * from './components/Button'
export * from './components/Input'
export * from './components/SDesignSystemProvider'
export { DesignSystem, useDesignSystem } from './state/design-system'
export * from './components/SSelect'
export * from './components/SModal'
export * from './components/SNotifications'
export * from './components/SToasts'
export * from './components/SAlert'

import { Plugin } from 'vue'
import { SButton } from './components/Button'
import { SJsonInput, Autocomplete } from './components/Input'
import { SDesignSystemProvider } from './components/SDesignSystemProvider'
import { SSelect, SDropdown } from './components/SSelect'
import { SModal, SModalCard } from './components/SModal'
import { SToastsDisplay, SToastsProvider } from './components/SToasts'
import { SNotificationBody, SNotificationsProvider, SUseNotification } from './components/SNotifications'
import { SAlert } from './components/SAlert'

export function plugin(): Plugin {
  return (app) => {
    app.component('SButton', SButton)
    app.component('SJsonInput', SJsonInput)
    app.component('Autocomplete', Autocomplete)
    app.component('SDesignSystemProvider', SDesignSystemProvider)
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
  }
}
