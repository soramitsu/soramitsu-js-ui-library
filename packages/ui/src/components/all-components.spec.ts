import { test, expect } from 'vitest'
import { COMPONENTS } from './all-components'
import { getComponentName } from '../util'

for (const [nameExpected, component] of Object.entries(COMPONENTS)) {
  // @vitest-environment happy-dom
  test(`Component "${nameExpected}" should have the same actual "name"`, () => {
    const nameActual = getComponentName(component)

    expect(nameActual).toEqual(nameExpected)
  })
}
