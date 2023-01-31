import { defineMeta, defineStory } from './util'
import { SNotificationsProvider, SUseNotification, useNotifications, SNotificationBody, Status } from '@/lib'
import { not } from '@vueuse/math'

export default defineMeta({
  title: 'Example/Notifications',
})

const ConfigurableProvider = defineComponent({
  components: { SNotificationsProvider },
  setup() {
    const vert = ref('top')
    const vertItems = ['bottom', 'top']
    const hor = ref('left')
    const horItems = ['left', 'center', 'right']

    return { vert, vertItems, hor, horItems }
  },
  template: `
    <SNotificationsProvider
      :vertical="vert"
      :horizontal="hor"
    >
      <div class="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div class="pointer-events-auto">
          Vertical:
          <select v-model="vert">
            <option v-for="x in vertItems" :key="x" :value="x">{{ x }}</option>
          </select>

          Horizontal:
          <select v-model="hor">
            <option v-for="x in horItems" :key="x" :value="x">{{ x }}</option>
          </select>

          <div>
            <slot />
          </div>
        </div>
      </div>

      
    </SNotificationsProvider>
  `,
})

export const ViaComponent = defineStory(() => ({
  components: {
    ConfigurableProvider,
    SUseNotification,
  },
  setup() {
    const show = ref(true)

    whenever(not(show), () => {
      setTimeout(() => {
        show.value = true
      }, 650)
    })

    return { show }
  },
  template: `
    <ConfigurableProvider>
      <SUseNotification v-model:show="show" :timeout="0" show-close-btn>
        <template #title>
          MEWO?
        </template>
        <template #description>
          Waiting for something to happen?
        </template>
      </SUseNotification>
    </ConfigurableProvider>
  `,
}))
ViaComponent.storyName = 'Via SUseNotification'

export const ViaComposable = defineStory(() => ({
  components: {
    ConfigurableProvider,
    Trigger: {
      setup() {
        const { show } = useNotifications()

        return {
          show: () => {
            show({
              title: 'Knock-knock',
              descriptionSlot: () => ['Do ', h('b', 'not'), ' open the door'],
              timeout: 1000 + ~~(Math.random() * 2000),
              status: Status.Warning,
            })
          },
        }
      },
      template: `
        <button @click="show()">
          Show notification
        </button>
      `,
    },
  },
  setup() {},
  template: `
    <ConfigurableProvider>
      <Trigger />
    </ConfigurableProvider>
  `,
}))

export const PureNotifucationBody = defineStory(() => ({
  components: { SNotificationBody },
  setup() {
    const statuses = Object.values(Status)

    const closed = ref(0)
    const timedOut = ref(0)

    return { statuses, timedOut, closed }
  },
  template: `
    <div class="grid grid-cols-2 gap-4">
      <SNotificationBody
        v-for="(x, i) in statuses"
        :key="x"
        :status="x"
        :timeout="2000 * (i + 1)"
        :show-close-btn="closed < 10"
        @click:close="closed++"
        @timeout="timedOut++"
      >
        <template #title>"{{ x }}" notification</template>
        <template #description>
          You can put <u>anything here</u>. Links too.
          <template v-if="timedOut">
            <br>Timeouts: {{ timedOut }}
          </template>
          <template v-if="closed">
            <br>Closed: {{ closed }}
          </template>
        </template>
      </SNotificationBody>
    </div>
  `,
}))
