import { defineMeta, defineStory } from './util'
import { SLink } from '@/lib'
import { IconClose } from '@/components/icons'

export default defineMeta({
  title: 'Example/Button'
})

export const Configurable = defineStory((args) =>  ({
  components: {
    SLink,
    IconClose,
  },
  setup() {
    return {
      args
    }
  },
  template: `
    <div class="flex flex-col items-start">
    <SLink v-bind="args">
      {{ args.type }}
    </SLink>
    <SLink
        v-bind="args"
        class="mt-4"
    >
      {{ args.type }}
    </SLink>
    </div>
  `
}))
Configurable.argTypes = {
  type: {
    options: ['link', 'hint'],
    control: 'inline-radio'
  },
  iconPosition: {
    options: ['left', 'right'],
    control: 'inline-radio'
  },
  icon: {
    control: 'boolean'
  }
}
Configurable.args = {
  type: 'link',
  icon: true,
  iconPosition: 'left',
}
