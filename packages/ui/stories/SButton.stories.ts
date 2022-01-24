import { defineMeta, defineStory } from './util'
import { SButton } from '@/lib'
import { IconClose } from '@/components/icons'

export default defineMeta({
  title: 'Example/Button'
})

export const Configurable = defineStory((args) =>  ({
  components: {
    SButton,
    IconClose,
  },
  setup() {
    return {
      args
    }
  },
  template: `
    <div class="flex flex-col items-start">
      <SButton v-bind="args">
        <template #icon>
          <IconClose style="width: 1em; height: 1em;"/>
        </template>
        {{ args.type }}
      </SButton>
      <SButton
          v-bind="args"
          class="mt-4"
      >
        <template #icon>
          <IconClose
            v-if="args.type === 'action'"
            style="width: 1em; height: 1em;"
          />
        </template>
        {{ args.type }}
      </SButton>
    </div>
  `
}))
Configurable.argTypes = {
  type: {
    options: ['primary', 'secondary', 'outline', 'action'],
    control: 'inline-radio'
  },
  size: {
    options: ['mini', 'small', 'medium', 'big'],
    control: 'inline-radio'
  },
  icon: { control: 'text' },
  iconPosition: {
    options: ['left', 'right'],
    control: 'inline-radio'
  },
  disabled: { control: 'boolean' },
  rounded: { control: 'boolean' },
  loading: { control: 'boolean' },
  uppercase: { control: 'boolean' },
}
Configurable.args = {
  type: 'primary',
  size: 'medium',
  icon: '',
  iconPosition: 'left',
  disabled: false,
  rounded: false,
  loading: false,
  uppercase: false,
}
