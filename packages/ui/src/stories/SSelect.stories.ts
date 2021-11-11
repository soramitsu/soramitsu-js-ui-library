import { Option } from '@/components/SSelect/types'
import { SSelect, SSelectSize } from '@/lib'
import { Story } from '@storybook/vue3'
import { defineMeta } from './util'
import { ref } from 'vue'

const BoolArg = { control: { type: 'boolean ' } }

export default defineMeta({
  title: 'Example/Select',
  component: SSelect,
  argTypes: {
    multiple: BoolArg,
    disabled: BoolArg,
    size: {
      control: {
        type: 'select',
        options: SSelectSize,
      },
    },
  },
})

const Template: Story = (args: { multiple?: boolean; size?: SSelectSize }) => ({
  components: { SSelect },
  setup() {
    const options: Option[] = [
      {
        label: 'Dip',
        value: 'dip',
      },
      {
        label: 'Labala',
        value: 'lab',
      },
      {
        label: 'Toe',
        value: 'eot',
      },
    ]

    const model = ref(null)

    return {
      options,
      model,
      multiple: args.multiple ?? false,
      size: args.size,
    }
  },
  template: `
    <div>
      <SSelect
        v-model="model"
        :options="options"
        label="Some Label"
        class="w-[200px]"
        :multiple="multiple"
        :size="size"
      />
    </div>
  `,
})

export const SingleSelect = Template.bind({})
export const MultipleSelect = Template.bind({})
MultipleSelect.args = { multiple: true }
