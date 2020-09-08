import { text, withKnobs, boolean } from '@storybook/addon-knobs'

import { SSelect, SRow, SCol, SOption } from '../../components'

export default {
  component: SOption,
  title: 'Design System/Select/Option',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const optionsData = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]
export const configurable = () => ({
  components: { SSelect, SOption, SRow, SCol },
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
