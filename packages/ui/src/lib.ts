export * from './types'
export * from './components'

import { Plugin } from 'vue'
import { COMPONENTS } from './components/all-components'
import { getComponentName } from './util'

export function plugin(): Plugin {
  return (app) => {
    for (const comp of Object.values(COMPONENTS)) {
      // we can be sure that the name is set - thanks to tests
      const name = getComponentName(comp)!
      app.component(name, comp)
    }
  }
}
