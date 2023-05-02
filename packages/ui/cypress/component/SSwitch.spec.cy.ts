import { SSwitch } from '@/lib'
import { VueTestUtils } from 'cypress/vue'

before(() => {
  VueTestUtils.config.global.components = { SSwitch }
})

after(() => {
  VueTestUtils.config.global.components = {}
})

describe('SSwitch', () => {
  it('renders with specified label', () => {
    cy.mount(SSwitch, { props: { label: 'Label' } })

    cy.contains('Label')
  })

  it('renders unchecked switch by default', () => {
    cy.mount(SSwitch, { props: { label: 'Test' } })

    cy.get('input').should('be.not.checked')
  })

  it('renders disabled switch when prop is passed', () => {
    cy.mount(SSwitch, { props: { label: 'Test', disabled: true } })

    cy.get('input').should('be.disabled')
  })

  it('handles two-way data binding and rises value up', () => {
    cy.mount({
      setup() {
        const checked = ref(false)

        return { checked }
      },
      template: `
      <div class="switch">{{ checked }}</div>
      <SSwitch
        v-model="checked"
        label="Label"
      />
      `,
    })

    cy.contains('Label').click()
    cy.get('.switch').contains('true')
  })

  describe('a11y', () => {
    beforeEach(() => {
      cy.injectAxeAndConfigureCTDefaults()
    })

    it('SSwitch - a11y check with visible label', () => {
      cy.mount(SSwitch, { props: { label: 'Test' } })
      cy.checkA11y()
    })

    it('SSwitch - a11y check with hidden label', () => {
      cy.mount(SSwitch, { props: { label: 'Test', labelHidden: true } })
      cy.checkA11y()
    })
  })
})
