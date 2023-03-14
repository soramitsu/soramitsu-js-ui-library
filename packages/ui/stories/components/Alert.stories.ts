import { Status, SAlert } from '@/lib'
import type { Meta, StoryObj } from '@storybook/vue3'

const StoryComponent = defineComponent({
  components: { SAlert },
  props: ['status', 'title', 'description'],
  template: `
    <SAlert v-bind="{ status }">
      <template #title>
        {{ title }} 
      </template>
      <template #description v-if="description">
        {{ description }}
      </template>
    </SAlert>
  `,
})

const meta = {
  component: StoryComponent,
  args: {
    status: Status.Info,
    title: 'Soramitsu',
  },
  argTypes: {
    status: {
      options: Object.values(Status),
      control: 'select',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
} satisfies Meta<typeof StoryComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Info = {}
export const WithDescription = { args: { description: `It's not a cake` } } satisfies Story
export const Success = { args: { status: Status.Success } } satisfies Story
export const Warning = { args: { status: Status.Warning } } satisfies Story
export const Error = { args: { status: Status.Error } } satisfies Story
