import { text, withKnobs, boolean } from '@storybook/addon-knobs'

import { SSelect, SRow, SCol, SOption, SOptionGroup } from '../../components'

export default {
  component: SOptionGroup,
  title: 'Design System/Select/Option Group',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const optionsData = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]
export const configurable = () => ({
  components: { SSelect, SOption, SRow, SCol, SOptionGroup },
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
  }),
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    label: {
      default: text('Label', 'Custom')
    }
  }
})
