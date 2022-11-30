import { SSelect, SRow, SCol, SOption, SOptionGroup } from '../../components'

export default {
  component: SOptionGroup,
  title: 'Design System/Components/Select/Option Group',
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

export const optionsData = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]

export const configurable = (args, { argTypes }) => ({
  components: { SSelect, SOption, SRow, SCol, SOptionGroup },
  props: Object.keys(argTypes),
  template: `<s-row style="flex: 1;">
               <s-col :span="12">
                 <s-select v-model="model">
                   <s-option-group :label="label" :disabled="disabled">
                     <s-option
                       v-for="option in options"
                       :key="option.value"
                       :value="option.value"
                       :label="option.label"
                     />
                   </s-option-group>
                   <s-option-group label="Next group">
                     <s-option
                       v-for="option in options"
                       :key="option.value + '1'"
                       :value="option.value + '1'"
                       :label="option.label"
                     />
                   </s-option-group>
                 </s-select>
               </s-col>
             </s-row>`,
  data: () => ({
    model: '',
    options: optionsData
  })
})
