import { defineMeta, defineStory } from './util'
import { SRadio, SRadioGroup, RADIO_TYPE_VALUES, RADIO_SIZE_VALUES } from '@/lib'

export default defineMeta({
  title: 'Example/Radio',
})

export const Configurable = defineStory((args) => ({
  components: {
    SRadio,
    SRadioGroup,
  },
  setup: () => ({
    args,
    opts: ['Sorimitsu', 'Soramatsu', 'Tiramisu', 'Soramitsu'],
  }),
  template: `
    <SRadioGroup class="flex space-x-4">
      <SRadio
        v-for="x in opts"
        :key="x"
        :value="x"
        :type="args.type"
        :size="args.size"
        :disabled="args.disabled && x === 'Soramitsu'"
      >
        {{ x }}

        <template #description>
          Would you pick the correct one?
        </template>
      </SRadio>
    </SRadioGroup>
  `,
}))

Configurable.args = {
  type: 'default',
  size: 'md',
  disabled: false,
}

Configurable.argTypes = {
  type: {
    options: RADIO_TYPE_VALUES,
    control: 'inline-radio',
  },
  size: {
    options: RADIO_SIZE_VALUES,
    control: 'inline-radio',
  },
  disabled: {
    control: 'boolean',
  },
}
