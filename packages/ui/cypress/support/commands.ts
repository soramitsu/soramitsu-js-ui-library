// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// import 'cypress-plugin-snapshots/commands'

import 'cypress-axe'
import 'cypress-plugin-tab'

// Overwriting broken injection
Cypress.Commands.overwrite('injectAxe', () => {
  cy.task('readAxeCoreCached', null, { log: false }).then((contents) => {
    cy.get('head', { log: false }).then((el) => {
      el.append(`<script>${contents}</script>`)
    })
  })
})

Cypress.Commands.add('injectAxeAndConfigureCTDefaults', () => {
  cy.injectAxe()

  cy.configureAxe({
    rules: [
      {
        id: 'landmark-one-main',
        enabled: false,
      },
      {
        id: 'page-has-heading-one',
        enabled: false,
      },
      {
        id: 'region',
        enabled: false,
      },
    ],
  })
})

Cypress.Commands.add('dataCy', { prevSubject: 'optional' }, (subject, cyId) => {
  if (subject) {
    return cy.wrap(subject).find(`[data-cy=${cyId}]`)
  }
  return cy.get(`[data-cy=${cyId}]`)
})

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Command to inject axe-core & configure defaults that are suitable
       * for component testing
       */
      injectAxeAndConfigureCTDefaults: () => Chainable<null>

      /**
       * Shorthand for `[data-cy=<xxx>]` selector with a subject (`cy.find()`) or without (`cy.get()`)
       */
      dataCy: (cyId: string) => Chainable
    }
  }
}
