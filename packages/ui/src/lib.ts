export * from './components/Button'
export * from './components/Input'

import { Plugin } from 'vue'
import { SButton } from './components/Button'
import { SJsonInput, Autocomplete } from './components/Input'

export function plugin(): Plugin {
  return (app) => {
    app.component('SButton', SButton)
    app.component('SJsonInput', SJsonInput)
    app.component('Autocomplete', Autocomplete)
  }
}
