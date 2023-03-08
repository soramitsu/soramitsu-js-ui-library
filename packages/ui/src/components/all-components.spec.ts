import { test, expect } from 'vitest'
import { COMPONENTS } from './all-components'
import { getComponentName } from '../util'

for (const [nameExpected, component] of Object.entries(COMPONENTS)) {
  // FIXME it seems that automatic name inference does not work anymore
  //       https://vuejs.org/api/sfc-spec.html#automatic-name-inference
  //       Should we really set it? Reasons:
  //       - DevTools inspection and dev warnings (should work without setting `.name`, need to check)
  //       - Global components registration
  test.skip(`Component "${nameExpected}" should have the same actual "name"`, () => {
    const nameActual = getComponentName(component)

    expect(nameActual).toEqual(nameExpected)
  })
}
