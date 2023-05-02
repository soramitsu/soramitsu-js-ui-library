import { SModalCard, SModal, SButton } from '@/lib'
import type { Meta } from '@storybook/vue3'

export default {
  component: defineComponent({
    components: {
      SModal,
      SModalCard,
      SButton,
      Counter: defineComponent({
        setup() {
          return { count: useInterval(300) }
        },
        template: `{{ count }}`,
      }),
    },
    setup() {
      return {
        show: ref(false),
      }
    },
    template: `
      <SButton @click="show = true">
        Show modal
      </SButton>
  
      <SModal v-model:show="show" v-bind="$attrs">
        <SModalCard>
          <template #title>
            Modal <i>title</i>
          </template>
          
          <div class="space-y-4">


          <p>
            Pay attention to focus trap! (button is focused!)
          </p>

          <p>
            Counter (eagerness check): <Counter />
          </p>

          <SButton @click="show = false">
            Close
          </SButton>
          </div>
        </SModalCard>
      </SModal>
    `,
  }),
  args: {
    closeOnOverlayClick: true,
    closeOnEsc: true,
    focusTrap: true,
    eager: false,
  },
} satisfies Meta

export const Default = {}
