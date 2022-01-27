import { defineMeta, defineStory } from './util'
import { SAccordionItem, SAccordion } from '@/lib'

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

export const Accordion = defineStory((args: Record<string, unknown>) =>  ({
  components: {
    SAccordionItem,
    SAccordion
  },
  setup() {
    return {
      args,
      model: ref([]),
    }
  },
  template: `
    <SAccordion v-model="model">
      <SAccordionItem name="item1">
        <template #title>Item 1</template>
        <template #subtitle>first item</template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </SAccordionItem>
      <SAccordionItem name="item1">
        <template #title>Item 2</template>
        <template #subtitle>second item</template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur.
      </SAccordionItem>
    </SAccordion>
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
