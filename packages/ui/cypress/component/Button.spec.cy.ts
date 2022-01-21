import { mount } from '@cypress/vue'
import { SButton } from '@/lib'

const testIdSelector = (id: string) => `[data-testid=${id}]`

describe('Button', () => {
  const findButton = () => cy.get('button')

  context('Given prop disabled', () => {
    context('When It is true', () => {
      beforeEach(() => {
        mount(SButton, {
          propsData: {
            disabled: true,
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then it has disabled natively', () => {
        findButton().should('have.prop', 'disabled', true)
      })

      it('Then it has special class', () => {
        findButton().should('have.class', 's-button_disabled')
      })
    })
  })

  context('Given prop loading', () => {
    context('When It is true', () => {
      beforeEach(() => {
        mount(SButton, {
          propsData: {
            loading: true,
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then it has spinner', () => {
        findButton().get(testIdSelector('spinner')).should('exist')
      })

      it('Then there are no icon and text', () => {
        findButton().get(testIdSelector('icon')).should('be.hidden')
        findButton().get(testIdSelector('text')).should('be.hidden')
      })

      it('Then it is disabled', () => {
        findButton().should('have.prop', 'disabled', true)
        findButton().should('have.class', 's-button_disabled')
      })
    })
  })

  context('Given prop uppercase', () => {
    context('When It is true and button is mini sized', () => {
      beforeEach(() => {
        mount(SButton, {
          propsData: {
            size: 'mini',
            uppercase: true,
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then text is in upper case', () => {
        findButton().should('have.css', 'text-transform', 'uppercase')
      })
    })
  })

  context('Given prop rounded', () => {
    context('When It is true and button is type action', () => {
      beforeEach(() => {
        mount(SButton, {
          propsData: {
            type: 'action',
            rounded: true,
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then text is in upper case', () => {
        findButton().should('have.class', 'rounded-full')
      })
    })
  })
})
