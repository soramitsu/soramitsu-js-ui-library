export * from './components/Button'
export * from './components/Input'
export * from './components/SDesignSystemProvider'
export { DesignSystem, useDesignSystem } from './state/design-system'
export * from './components/SSelect'
export * from './components/SModal'

import { Plugin } from 'vue'
import { SButton } from './components/Button'
import { SJsonInput, Autocomplete } from './components/Input'
import { SDesignSystemProvider } from './components/SDesignSystemProvider'
import { SSelect, SDropdown } from './components/SSelect'
import { SModal, SModalCard } from './components/SModal'

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
  }
}
