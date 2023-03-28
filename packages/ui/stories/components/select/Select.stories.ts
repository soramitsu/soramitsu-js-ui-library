import { SSelect } from '@/lib'
import type { Meta, StoryObj } from '@storybook/vue3'
import { COMMON_ARG_TYPES, COMMON_ARGS, OPTION_GROUPS, OPTIONS } from './common'

const meta = {
  component: defineComponent({
    components: { SSelect },
    setup() {
      return { model: ref(['en', 'jp']) }
    },
    template: `
      <div class="flex">
        <SSelect v-bind="$attrs" v-model="model" />
      </div>
    `,
  }),
  args: { ...COMMON_ARGS, searchInInput: false },
  argTypes: COMMON_ARG_TYPES,
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Simple_Options = {
  args: {
    options: OPTIONS,
  },
} satisfies Story

export const Option_Groups = {
  args: {
    options: OPTION_GROUPS,
  },
} satisfies Story
