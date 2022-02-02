import { mount } from '@cypress/vue'
import { SSwitch } from '@/lib'
import { config } from '@vue/test-utils'

before(() => {
  config.global.components = { SSwitch }
})

after(() => {
  config.global.components = {}
})

it('SSwitch - renders with specified label', () => {
  mount(SSwitch, { props: { id: 'id', label: 'Label' } })

  cy.contains('Label')
})

it('SSwitch - renders unchecked switch by default', () => {
  mount(SSwitch, { props: { id: 'id' } })

  cy.get('input').should('be.not.checked')
})

it('SSwitch - renders disabled switch when prop is passed', () => {
  mount(SSwitch, { props: { id: 'id', disabled: true } })

  cy.get('input').should('be.disabled')
})

it('SSwitch - handles two-way data binding and rises value up', () => {
  mount({
    setup() {
      const checked = ref(false)

      return { checked }
    },
    template: `
      <div class="switch">{{ checked }}</div>
      <SSwitch
        id="id"
        v-model="checked"
        label="Label"
      />
      `,
  })

  cy.contains('Label').click()
  cy.get('.switch').contains('true')
})

it('SSwitch - has the same id for linking label with input element', () => {
  const id = 'identificator'
  mount(SSwitch, { props: { id } })

  cy.get('input').should('have.id', id)
  cy.get('label').should('have.attr', 'for', id)
})
