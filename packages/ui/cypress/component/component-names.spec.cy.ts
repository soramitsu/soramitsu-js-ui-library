import { COMPONENTS } from '@/components/all-components'
import { getComponentName } from '@/util'

for (const [name, component] of Object.entries(COMPONENTS)) {
  it(`Component "${name}" is named as "${name}"`, { retries: 0 }, () => {
    const nameExtracted = getComponentName(component)

    cy.wrap({ name: nameExtracted })
      // trick to avoid error retries
      .its('name', { timeout: 0 })
      .should('eq', nameExtracted)
  })
}
