import { STextField, Status } from '@/lib'
import IconQuestion from '@soramitsu-ui/icons/icomoon/notifications-question-circle-24.svg'
import IconCopy from '@soramitsu-ui/icons/icomoon/basic-copy-24.svg'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  component: defineComponent({
    components: { STextField, IconCopy, IconQuestion },
    props: ['modelValue', 'oneIcon', 'twoIcons'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const model = useVModel(props, 'modelValue', emit, { passive: true })
      return { model }
    },
    template: `
      <STextField v-model="model" v-bind="$attrs">
        <template #append v-if="twoIcons || oneIcon">
          <IconCopy/>
          <IconQuestion v-if="twoIcons" />
        </template>
      </STextField>
    `,
  }),
  decorators: [
    () => ({
      template: `
      <div class="w-max">
        <story />
      </div>
    `,
    }),
  ],
  args: {
    label: 'Your name',
    modelValue: '',
    password: false,
    noEye: false,
    disabled: false,
    counter: false,
    status: undefined,
    success: false,
    error: false,
    message: '',
    filledState: false,
  },
  argTypes: {
    counter: {
      // FIXME make combined bool & number control
      control: 'object',
    },
    status: {
      control: 'inline-radio',
      options: [undefined, Status.Success, Status.Error, Status.Warning],
      // type: 'inline-radio'
    },
  },
} as Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default = {}

export const OneIcon = { args: { oneIcon: true } } as Story
export const TwoIcons = { args: { twoIcons: true } } as Story
