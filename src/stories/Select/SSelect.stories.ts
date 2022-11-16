import { Meta, Story } from '@storybook/vue'

import { SSelect, SRow, SCol, SOption } from '../../components'
import { Size, BorderRadius } from '../../types'
import { InputTypes } from '../../components/Select'

const optionsData = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]

export default {
  component: SSelect,
  title: 'Design System/Components/Select',
  excludeStories: /.*Data$/,
  argTypes: {
    inputType: {
      name: 'Input type',
      control: {
        type: 'select',
        options: Object.values(InputTypes)
      },
      defaultValue: InputTypes.SELECT
    },
    multiple: {
      name: 'Multiple',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    borderRadius: {
      name: 'BorderRadius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    loading: {
      name: 'Loading',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.BIG
    },
    clearable: {
      name: 'Clearable',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    multipleLimit: {
      name: 'Multiple limit',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text'
      },
      defaultValue: 'Select'
    },
    multipleTextPrefix: {
      name: 'Multiple text prefix',
      control: {
        type: 'text'
      },
      defaultValue: 'Data'
    },
    loadingText: {
      name: 'Loading text',
      control: {
        type: 'text'
      },
      defaultValue: 'Loading'
    },
    noDataText: {
      name: 'No data text',
      control: {
        type: 'text'
      },
      defaultValue: 'No data'
    },
    filterable: {
      name: 'Filterable',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SSelect, SOption, SRow, SCol },
  props: Object.keys(argTypes),
  template: `
  <s-select
    v-model="model"
    :disabled="disabled"
    :border-radius="borderRadius"
    :loading="loading"
    :size="size"
    :multiple="multiple"
    :input-type="inputType"
    :clearable="clearable"
    :multiple-limit="multipleLimit"
    :placeholder="placeholder"
    :multiple-text-prefix="multipleTextPrefix"
    :loading-text="loadingText"
    :no-data-text="noDataText"
    :popper-class="borderRadius"
    @change="handleChange"
    :filterable="filterable"
  >
    <s-option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :label="option.label"
    />
  </s-select>
  `,
  data: () => ({
    model: '',
    options: optionsData
  }),
  methods: {
    handleChange: (selected) => console.log('handleChange', selected)
  }
})

export const Configurable = Template.bind({})
