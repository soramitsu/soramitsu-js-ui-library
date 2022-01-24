import { mount } from '@cypress/vue'
import { SLink } from '@/lib'

const testIdSelector = (id: string) => `[data-testid=${id}]`

describe('Link', () => {
  const findDefaultLink = () => cy.get('a')

  context('Given prop icon', () => {
    context('When it is true', () => {
      beforeEach(() => {
        mount(SLink, {
          propsData: {
            icon: true,
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then there is icon', () => {
        findDefaultLink().get(testIdSelector('icon')).should('exist')
      })
    })

    context('When it is false', () => {
      beforeEach(() => {
        mount(SLink, {
          propsData: {
            icon: false,
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then there is no icon', () => {
        findDefaultLink().get(testIdSelector('icon')).should('not.exist')
      })
    })
  })

  context('Given prop type', () => {
    context('When it is link', () => {
      beforeEach(() => {
        mount(SLink, {
          propsData: {
            type: 'link',
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then text have solid underline', () => {
        findDefaultLink().should('have.css', 'text-decoration-line', 'underline')
        findDefaultLink().should('have.css', 'text-decoration-style', 'solid')
      })
    })

    context('When it is hint', () => {
      beforeEach(() => {
        mount(SLink, {
          propsData: {
            type: 'hint',
          },
          slots: {
            default: () => 'Soramitsu'
          }
        })
      })

      it('Then text have dotted underline', () => {
        findDefaultLink().should('have.css', 'text-decoration-line', 'underline')
        findDefaultLink().should('have.css', 'text-decoration-style', 'dotted')
      })
    })
  })
})
