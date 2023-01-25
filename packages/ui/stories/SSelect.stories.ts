import {
  SSelect,
  SDropdown,
  SSelectBase,
  SSelectButton,
  useSelectApi,
  SelectOption,
  SelectOptionGroup,
  SelectOptionType,
} from '@/lib'
import { defineMeta, defineStory } from './util'
import { ref } from 'vue'

const commonArgTypes = {
  size: {
    options: ['sm', 'md', 'lg', 'xl'],
    control: 'inline-radio',
  },
  optionType: {
    options: Object.values(SelectOptionType),
    control: 'inline-radio',
  },
  disabled: { control: 'boolean' },
  loading: { control: 'boolean' },
}
const commonArgs = {
  size: 'md',
  disabled: false,
  loading: false,
}

export default defineMeta({
  title: 'Example/Select',
  decorators: [
    () => ({
      template: `
        <div class="grid grid-cols-2 gap-4 w-1/2">
          <story />
        </div>
      `,
    }),
  ],
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
    label: 'Iceland',
    value: 'is',
  },
  {
    label: 'Japan',
    value: 'jp',
  },
]
const OPTION_GROUPS: SelectOptionGroup[] = [
  {
    header: '1 group',
    selectAllBtn: true,
    items: [
      {
        label: 'Germany',
        value: 'du',
      },
      {
        label: 'England',
        value: 'en',
      },
    ],
  },
  {
    header: '2 group',
    selectAllBtn: true,
    items: [
      {
        label: 'Iceland',
        value: 'is',
      },
      {
        label: 'Japan',
        value: 'jp',
      },
    ],
  },
]

export const SelectSingle = defineStory((args) => ({
  components: {
    SSelect,
  },
  setup() {
    return {
      OPTIONS,
      OPTION_GROUPS,
      model: ref(null),
      args,
    }
  },
  template: `
    <SSelect
      v-model="model"
      label="Single select"
      :options="OPTIONS"
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
    />
    <SSelect
      v-model="model"
      label="Single select"
      :options="OPTION_GROUPS"
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
    />
  `,
}))

SelectSingle.argTypes = commonArgTypes
SelectSingle.args = commonArgs

export const SelectMultiple = defineStory((args) => ({
  components: { SSelect },
  setup() {
    return {
      OPTIONS,
      OPTION_GROUPS,
      model: ref(['en', 'jp']),
      args,
    }
  },
  template: `
    <SSelect
      v-model="model"
      label="Multi select"
      :options="OPTIONS"
      multiple
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
    />
    <SSelect
      v-model="model"
      label="Multi select"
      :options="OPTION_GROUPS"
      multiple
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
    />
  `,
}))

SelectMultiple.argTypes = commonArgTypes
SelectMultiple.args = commonArgs

export const Dropdown = defineStory((args) => ({
  components: { SDropdown },
  setup() {
    return {
      OPTIONS,
      OPTION_GROUPS,
      model: ref(['en', 'jp']),
      args,
    }
  },
  template: `
    <SDropdown
      v-model="model"
      label="Country"
      :options="OPTIONS"
      multiple
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
    />
    <SDropdown
      v-model="model"
      label="Country"
      :options="OPTION_GROUPS"
      multiple
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
    />
  `,
}))

Dropdown.argTypes = commonArgTypes
Dropdown.args = commonArgs

export const WithSearch = defineStory((args) => ({
  components: { SSelect, SDropdown },
  setup() {
    const asyncOptions = shallowRef([...OPTIONS])
    const isLoadingAsyncOptions = ref(false)

    async function handleSearch(value: string) {
      isLoadingAsyncOptions.value = true
      asyncOptions.value = await new Promise((resolve) => {
        setTimeout(() => resolve(OPTIONS.filter((x) => new RegExp(value, 'i').test(x.label))), 1000)
      })
      isLoadingAsyncOptions.value = false
    }

    return {
      OPTION_GROUPS,
      asyncOptions,
      isLoadingAsyncOptions,
      model: ref(['en', 'jp']),
      handleSearch,
      args,
    }
  },
  template: `
    <SSelect
      v-model="model"
      label="Multi select"
      :options="OPTION_GROUPS"
      multiple
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :option-type="args.optionType"
      dropdown-search
    />
    <SDropdown
      v-model="model"
      label="Country"
      :options="asyncOptions"
      multiple
      :size="args.size"
      :disabled="args.disabled"
      :loading="isLoadingAsyncOptions"
      :option-type="args.optionType"
      dropdown-search
      custom-search
      @search="handleSearch"
    />
  `,
}))

WithSearch.argTypes = commonArgTypes
WithSearch.args = commonArgs

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
