import { SSelect, SDropdown, SelectOption, SSelectBase, SSelectButton, useSelectApi } from '@/lib'
import { defineMeta, defineStory } from './util'
import { ref } from 'vue'

const sizeArg = {
  options: ['sm', 'md', 'lg', 'xl'],
  control: 'inline-radio',
}

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

export const SelectSingle = defineStory((args) => ({
  components: {
    SSelect,
  },
  setup() {
    return {
      OPTIONS,
      model: ref(null),
      args
    }
  },
  template: `
    <SSelect
      v-model="model"
      label="Single select"
      :options="OPTIONS"
      :size="args.size"
    />
  `,
}))

SelectSingle.argTypes = {
  size: sizeArg,
}
SelectSingle.args = {
  size: 'md',
}

export const SelectMultiple = defineStory((args) => ({
  components: { SSelect },
  setup() {
    return {
      OPTIONS,
      model: ref(['en', 'jp']),
      args
    }
  },
  template: `
    <SSelect
      v-model="model"
      label="Multi select"
      :options="OPTIONS"
      multiple
      :size="args.size"
    />
  `,
}))

SelectMultiple.argTypes = {
  size: sizeArg,
}
SelectMultiple.args = {
  size: 'md',
}

export const Dropdown = defineStory((args) => ({
  components: { SDropdown },
  setup() {
    return {
      OPTIONS,
      model: ref(['en', 'jp']),
      args
    }
  },
  template: `
    <SDropdown
      v-model="model"
      label="Country"
      :options="OPTIONS"
      multiple
      :size="args.size"
    />
  `,
}))

Dropdown.argTypes = {
  size: sizeArg,
}
Dropdown.args = {
  size: 'md',
}

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
