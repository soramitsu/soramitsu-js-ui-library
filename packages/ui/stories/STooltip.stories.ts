import { defineMeta, defineStory } from './util'
import { STooltip, SLink, SNotificationsProvider, SUseNotification } from '@/lib'

export default defineMeta({
  title: 'Example/Tooltip',
})

export const Configurable = defineStory(() => ({
  components: {
    STooltip,
    SomeElement: {
      components: { SLink },
      template: `<SLink :icon="false" underline="dotted"><slot/></SLink>`,
    },
    SNotificationsProvider,
    SUseNotification,
  },
  setup() {
    const show = ref(false)
    const notificationMessage = ref('')

    return {
      show,
      notificationMessage,
      handlePrimaryButtonClick: () => {
        show.value = true
        notificationMessage.value = 'Primary button clicked'
      },
      handleSecondaryButtonClick: () => {
        show.value = true
        notificationMessage.value = 'Secondary button clicked'
      },
    }
  },
  template: `
    <SNotificationsProvider>
      <SUseNotification v-model:show="show" show-close-btn>
        <template #title>
          {{ notificationMessage }}
        </template>
      </SUseNotification>
    </SNotificationsProvider>

    <div class="flex justify-around py-56px">
      <STooltip content="Body text">
        <SomeElement>Default tooltip</SomeElement>
      </STooltip>

      <STooltip
        placement="left"
        header="Header"
        content="Body text"
      >
        <SomeElement>Tooltip with header</SomeElement>
      </STooltip>
    </div>
    
    <div class="flex justify-around py-56px">
      <STooltip
        placement="right"
        primary-button-text="Button"
        @click:primary-button="handlePrimaryButtonClick"
      >
        <SomeElement>Tooltip with button</SomeElement>
  
        <template #content>Body text</template>
      </STooltip>
    
      <STooltip
        placement="top"
        primary-button-text="Button"
        secondary-button-text="Button"
        @click:primary-button="handlePrimaryButtonClick"
        @click:secondary-button="handleSecondaryButtonClick"
      >
        <SomeElement>Tooltip with header and buttons</SomeElement>
        
        <template #header>Header</template>
        
        <template #content>Body text</template>
      </STooltip>
    </div>
  `,
}))
