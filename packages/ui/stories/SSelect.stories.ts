import { SSelect, SDropdown, SelectOption, SSelectBase, SSelectButton, SSelectOption, useSelectApi } from '@/lib'
import { defineMeta, defineStory } from './util'
import { ref } from 'vue'

export default defineMeta({
  title: 'Example/Select',
})

const OPTIONS: SelectOption[] = [
  {
    label: 'Germany',
    value: 'du',
  },
  {
    label: 'England',
    value: 'en',
  },
  {
    label: 'Japan',
    value: 'jp',
  },
]

export const SelectSingle = defineStory(() => ({
  components: {
    SSelect,
  },
  setup() {
    return {
      OPTIONS,
      model: ref(null),
    }
  },
  template: `
    <SSelect
      v-model="model"
      label="Single select"
      :options="OPTIONS"
    />
  `,
}))

export const SelectMultiple = defineStory(() => ({
  components: { SSelect },
  setup() {
    return { OPTIONS, model: ref(['en', 'jp']) }
  },
  template: `
    <SSelect
      v-model="model"
      label="Multi select"
      :options="OPTIONS"
      multiple
    />
  `,
}))

export const Dropdown = defineStory(() => ({
  components: { SDropdown },
  setup() {
    return { OPTIONS, model: ref(['en', 'jp']) }
  },
  template: `
    <SDropdown
      v-model="model"
      label="Country"
      :options="OPTIONS"
      multiple
    />
  `,
}))

export const Custom = defineStory(() => ({
  components: {
    SSelectBase,
    SSelectButton,
    CustomDropdown: {
      setup() {
        const api = useSelectApi()

        return { api }
      },
      template: `
        <div class="bg-blue-300 text-xs">
          <pre>{{ api }}</pre>
        </div>
      `,
    },
  },
  setup() {
    return { OPTIONS, model: ref('en') }
  },
  template: `
    <SSelectBase
      v-model="model"
      label="I am very custom"
      :options="OPTIONS"
    >
      <template #control>
        <SSelectButton />
      </template>

      <template #dropdown>
        <CustomDropdown />
      </template>
    </SSelectBase>
  `,
}))
