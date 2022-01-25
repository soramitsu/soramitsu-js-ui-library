import { defineMeta, defineStory } from './util'
import { SAccordion } from '@/lib'

export default defineMeta({
  title: 'Example/Accordion'
})

export const Configurable = defineStory((args) =>  ({
  components: {
    SAccordion,
  },
  setup() {
    return {
      args
    }
  },
  template: `
    <SButton v-bind="args">
      {{ args.type }}
    </SButton>
  `
}))
Configurable.argTypes = {
}
Configurable.args = {
}
