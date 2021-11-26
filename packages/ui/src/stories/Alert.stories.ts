import { Status, SAlert } from '@/lib'
import { defineMeta, defineStory } from './util'

export default defineMeta({
  title: 'Example/Alert',
})

export const DifferentStatuses = defineStory(() => ({
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
}))
