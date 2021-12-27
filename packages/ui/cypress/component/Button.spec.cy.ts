import { mount } from '@cypress/vue'
import { SButton } from '@/lib'

it('Playground', () => {
  mount(SButton, { slots: { default: () => 'Soramitsu' } })
})
