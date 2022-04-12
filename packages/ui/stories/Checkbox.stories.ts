import { SCheckboxAtom, SCheckboxSolo, CHECKBOX_SIZE_VALUES, CHECKBOX_TYPE_VALUES } from '@/lib'
import { defineMeta, defineStory } from './util'

export default defineMeta({
  title: 'Example/Checkbox',
})

export const AtomConfigurable = defineStory((args) => ({
  components: { SCheckboxAtom },
  setup: () => ({ args }),
  template: `
    <SCheckboxAtom v-bind="args" />
  `,
}))

AtomConfigurable.argTypes = {
  size: {
    options: CHECKBOX_SIZE_VALUES,
    control: 'inline-radio',
  },
  checked: {
    options: [false, true, 'mixed'],
    control: 'inline-radio',
  },
  hover: {
    control: 'boolean',
  },
  disabled: {
    control: 'boolean',
  },
}

AtomConfigurable.args = {
  size: 'md',
  checked: false,
  disabled: false,
  hover: false,
}

export const SoloTwoCheckboxes = defineStory((args) => ({
  components: { SCheckboxSolo },
  setup: () => ({ args }),
  template: `
    <div class="flex space-x-4">
      <SCheckboxSolo v-bind="args">
        Tiramisu
      </SCheckboxSolo>

      <SCheckboxSolo>
        Soramatsu
      </SCheckboxSolo>
    </div>
  `,
}))

export const SoloBordered = defineStory((args) => ({
  components: { SCheckboxSolo },
  setup: () => ({ args }),
  template: `
    <SCheckboxSolo type="bordered" v-bind="args" class="inline-block">
      Miramitsu
    </SCheckboxSolo>
  `,
}))

export const SoloDescription = defineStory((args) => ({
  components: { SCheckboxSolo },
  setup: () => ({ args }),

  template: `
    <SCheckboxSolo v-bind="args" type="bordered-with-description" class="inline-block">
      Miramistin

      <template #description>
        Siramatsu
      </template>
    </SCheckboxSolo>
  `,
}))

SoloTwoCheckboxes.argTypes =
  SoloBordered.argTypes =
  SoloDescription.argTypes =
    {
      disabled: {
        control: 'boolean',
      },
    }

SoloTwoCheckboxes.args =
  SoloBordered.args =
  SoloDescription.args =
    {
      disabled: false,
    }
