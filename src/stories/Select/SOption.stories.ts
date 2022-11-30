import { SSelect, SRow, SCol, SOption } from '../../components'

const optionsData = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]

export default {
  component: SOption,
  title: 'Design System/Components/Select/Option',
  excludeStories: /.*Data$/,
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    label: {
      name: 'Label',
      control: {
        type: 'text'
      },
      defaultValue: 'Custom'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { SSelect, SOption, SRow, SCol },
  props: Object.keys(argTypes),
  template: `<s-row style="flex: 1;">
               <s-col :span="12">
                 <s-select v-model="model">
                   <s-option value="custom" :label="label" :disabled="disabled"></s-option>
                   <s-option
                     v-for="option in options"
                     :key="option.value"
                     :value="option.value"
                     :label="option.label"
                   />
                 </s-select>
               </s-col>
             </s-row>`,
  data: () => ({
    model: '',
    options: optionsData
  })
})

export const Configurable = Template.bind({})
