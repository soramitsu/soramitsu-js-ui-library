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
    <SButton :type="type">{{type}}</SButton>
  `
}))
