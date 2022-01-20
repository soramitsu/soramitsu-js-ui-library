import { defineMeta, defineStory } from './util'
import { SButton } from '@/lib'
import { IconClose } from '@/components/icons'

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
    icon: {
      defaultValue: '',
      control: { type: 'text' }
    },
    iconPosition: {
      defaultValue: 'left',
      options: ['left', 'right'],
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
    loading: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    uppercase: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
  }
})

export const Button = defineStory((args) =>  ({
  components: {
    SButton,
    IconClose,
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
      :icon="icon"
      :icon-position="iconPosition"
      :loading="loading"
      :uppercase="uppercase"
    >
      <template #icon>
        <IconClose />
      </template>
      {{type}}
    </SButton>
  `
}))
