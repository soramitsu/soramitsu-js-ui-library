import { defineMeta, defineStory } from './util'
import { STextField, Status } from '@/lib'
import IconQuestion from '@soramitsu-ui/icons/icomoon/notifications-question-circle-24.svg'
import IconCopy from '@soramitsu-ui/icons/icomoon/basic-copy-24.svg'

export default defineMeta({
  title: 'Example/STextField',
  decorators: [
    () => ({
      template: `
        <div class="w-max">
          <story />
        </div>
      `,
    }),
  ],
})

export const JustAField = defineStory(() => ({
  components: { STextField },
  template: `
    <STextField
      label="Label"
    />
  `,
}))

export const DifferentStatuses = defineStory(() => ({
  components: { STextField },
  setup() {
    return {
      model: ref('Lorem ipsum'),
      STATUSES: [null, Status.Error, Status.Warning, Status.Success],
      showMessage: ref(false),
    }
  },
  template: `
    <input type="checkbox" v-model="showMessage"> Show message
    <div class="grid grid-cols-2 w-max gap-4 mt-4">
      <div
        v-for="status in STATUSES"
        :key="status"
        class="h-20"
      >
        <STextField
          v-model="model"
          :status="status"
        >
          <template #label>
            Cicero speech
          </template>
          <template #message v-if="showMessage">
            ...dolor sit amet
          </template>
        </STextField>
      </div>
    </div>
  `,
}))

export const Disabled = defineStory(() => ({
  setup() {
    return () => h(STextField, { label: 'Untouchable', disabled: true, modelValue: 'He-he' })
  },
}))

export const Password = defineStory(() => ({
  setup() {
    return () => h(STextField, { label: 'Top secret', password: true })
  },
}))

export const WithAppendix = defineStory(() => ({
  components: {
    STextField,
    IconCopy,
    IconQuestion,
  },
  template: `
    <STextField label="Label">
      <template #append>
        <IconCopy />
        <IconQuestion />
      </template>
    </STextField>
  `,
}))

export const WithCounter = defineStory(() => ({
  components: {
    STextField,
  },
  setup() {
    return {
      model: ref('Regulus'),
    }
  },
  template: `
    <div class="space-y-4">
      <STextField v-model="model" label="With a limit" counter="20" />
      <STextField v-model="model" label="Just a counter" counter />
    </div>
  `,
}))
