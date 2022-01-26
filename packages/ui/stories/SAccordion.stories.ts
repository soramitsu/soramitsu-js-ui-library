import { defineMeta, defineStory } from './util'
import { SAccordionItem } from '@/lib'

export default defineMeta({
  title: 'Example/Accordion'
})

export const AccordionItem = defineStory((args: Record<string, unknown>) =>  ({
  components: {
    SAccordionItem,
  },
  setup() {
    return {
      args,
      model: ref(false)
    }
  },
  template: `
    <SAccordionItem v-bind="args" v-model="model">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur.
    </SAccordionItem>
  `
}))
AccordionItem.argTypes = {
  title: { controls: 'text' },
  subtitle: { controls: 'text' },
}
AccordionItem.args = {
  title: 'Accordion item',
  subtitle: 'Accordion item description',
}
