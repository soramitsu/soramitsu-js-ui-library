import { mount } from '@cypress/vue'
import { SAccordion } from '@/lib'

const testIdSelector = (id: string) => `[data-testid=${id}]`

describe('Accordion', () => {

  mount(SAccordion, {
    propsData: {},
    slots: {
      default: () => 'Soramitsu'
    }
  })
})
