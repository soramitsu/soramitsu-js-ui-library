import { mount } from '@cypress/vue'
import { SSwitch } from '@/lib'

it('Playground', () => {
  mount(SSwitch)
})

it('SSwitch - renders with specified label', () => {
  mount(SSwitch, { props: { label: 'Label' } })

  cy.contains('Label')
})

it('SSwitch - renders checked switch by default', () => {
  mount(SSwitch, { props: {} })

  cy.get('input').should('be.checked')
})

it('SSwitch - renders unchecked switch when false prop is passed', () => {
  mount(SSwitch, { props: { checked: false } })

  cy.get('input').should('be.not.checked')
})

it('SSwitch - renders disabled switch when prop is passed', () => {
  mount(SSwitch, { props: { disabled: true } })

  cy.get('input').should('be.disabled')
})
