import { SModalCard, SModal } from '@/lib'
import { defineMeta, defineStory } from './util'

export default defineMeta({
  title: 'Example/SModal',
})

export const JustAModal = defineStory(() => ({
  components: { SModal, SModalCard },
  setup() {
    return {
      show: ref(false),
    }
  },
  template: `
    <button @click="show = true">
      Show modal
    </button>

    <SModal v-model:show="show">
      <SModalCard>
        <template #title>
          Modal <code>title</code>
        </template>
        
        <p class="my-4">
          Pay attention to focus trap! (button is focused!)
        </p>

        <button @click="show = false">
          Close
        </button>
      </SModalCard>
    </SModal>
  `,
}))
