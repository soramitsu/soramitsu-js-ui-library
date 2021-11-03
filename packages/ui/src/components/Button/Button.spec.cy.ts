import { mount } from '@cypress/vue'
import Button from './Button.vue'

it('Playground', () => {
  mount(Button, { slots: { default: () => 'Soramitsu' } })
})
