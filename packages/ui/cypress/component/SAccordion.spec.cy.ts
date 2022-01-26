import { mount } from '@cypress/vue'
import { SAccordionItem } from '@/lib'

const testIdSelector = (id: string) => `[data-testid=${id}]`

describe('Accordion', () => {

  mount(SAccordionItem, {
    propsData: {},
    slots: {
      default: () => 'Soramitsu'
    }
  })
})
