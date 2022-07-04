import { defineMeta, defineStory } from './util'
import { SButton, BUTTON_TYPE_VALUES, BUTTON_SIZE_VALUES, BUTTON_ICON_POSITION_VALUES } from '@/lib'
import { IconClose } from '@/components/icons'

export default defineMeta({
  title: 'Example/Button',
})

export const Configurable = defineStory((args) => ({
  components: {
    SButton,
    IconClose,
  },
  setup() {
    return {
      args,
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
  `,
}))
Configurable.argTypes = {
  type: {
    options: BUTTON_TYPE_VALUES,
    control: 'inline-radio',
  },
  size: {
    options: BUTTON_SIZE_VALUES,
    control: 'inline-radio',
  },
  icon: { control: 'text' },
  iconPosition: {
    options: BUTTON_ICON_POSITION_VALUES,
    control: 'inline-radio',
  },
  disabled: { control: 'boolean' },
  rounded: { control: 'boolean' },
  loading: { control: 'boolean' },
  uppercase: { control: 'boolean' },
}
Configurable.args = {
  type: 'primary',
  size: 'md',
  icon: '',
  iconPosition: 'left',
  disabled: false,
  rounded: false,
  loading: false,
  uppercase: false,
}
