import { defineMeta, defineStory } from './util'
import { SButton } from '@/lib'

export default defineMeta({
  title: 'Example/Button',
  argTypes: {
    type: {
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'outline', 'action'],
      control: { type: 'inline-radio' }
    },
    size: {
      defaultValue: 'medium',
      options: ['mini', 'small', 'medium', 'big'],
      control: { type: 'inline-radio' }
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    rounded: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
  }
})

export const Button = defineStory((args) =>  ({
  components: {
    SButton,
  },
  setup() {
    return args
  },
  template: `
    <SButton
      :type="type"
      :size="size"
      :disabled="disabled"
      :rounded="rounded"
    >
      {{type}}
    </SButton>
  `
}))
