import { Status, SAlert } from '@/lib'
import type { Meta, StoryFn } from '@storybook/vue3'

const meta = {
  title: 'Example/Alert',
} satisfies Meta

export default meta

export const DifferentStatuses: StoryFn = () => ({
  components: { SAlert },
  setup() {
    return {
      statuses: Object.values(Status),
    }
  },
  template: `
    <div class="grid grid-cols-2 gap-4 w-max">
      <SAlert
        v-for="x in statuses"
        :key="x"
        :status="x"
      >
        <template #title>
          {{ x }}
        </template>
      </SAlert>
    </div>
  `,
})
