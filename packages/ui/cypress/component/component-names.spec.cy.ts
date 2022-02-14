import { COMPONENTS } from '@/components/all-components'
import { getComponentName } from '@/util'

for (const [nameExpected, component] of Object.entries(COMPONENTS)) {
  it(`Component "${nameExpected}" is named as "${nameExpected}"`, { retries: 0 }, () => {
    const nameExtracted = getComponentName(component)

    cy.wrap({ name: nameExtracted })
      // trick to avoid error retries
      .its('name', { timeout: 0 })
      .should('eq', nameExpected)
  })
}
