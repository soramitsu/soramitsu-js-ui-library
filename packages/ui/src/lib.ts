export * from './components/Button'
export * from './components/Input'
export * from './components/SDesignSystemProvider'
export { DesignSystem, useDesignSystem } from './state/design-system'
export * from './components/SSelect'

import { Plugin } from 'vue'
import { SButton } from './components/Button'
import { SJsonInput, Autocomplete } from './components/Input'
import { SDesignSystemProvider } from './components/SDesignSystemProvider'
import { SSelect, SDropdown } from './components/SSelect'

export function plugin(): Plugin {
  return (app) => {
    app.component('SButton', SButton)
    app.component('SJsonInput', SJsonInput)
    app.component('Autocomplete', Autocomplete)
    app.component('SDesignSystemProvider', SDesignSystemProvider)
    app.component('SSelect', SSelect)
    app.component('SDropdown', SDropdown)
  }
}
