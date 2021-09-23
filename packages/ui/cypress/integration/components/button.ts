it('Primary button snapshot', () => {
  cy.visit('/components/button/')

  cy.get('[data-cy="story-just-button"]').toMatchImageSnapshot()
})

it('Rounded button snapshot', () => {
  cy.visit('/components/button/')

  cy.get('[data-cy="story-rounded-button"]').toMatchImageSnapshot()
})
