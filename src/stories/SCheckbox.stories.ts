import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SCheckbox, SRow, SCol } from '../components'
import { CheckboxSize } from '../components/Checkbox'

export default {
  component: SCheckbox,
  title: 'Design System/Checkbox',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SCheckbox, SRow },
  template: `<s-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-checkbox
                 v-model="checked"
                 :disabled="disabled"
                 :border="border"
                 :size="size"
                 :label="label"
                 @change="(value) => handleChange(value, checked)"
               >
               </s-checkbox>
             </s-row>`,
  data: () => ({
    checked: true
  }),
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    border: {
      default: boolean('Border', false)
    },
    label: {
      default: text('Label', 'Checkbox')
    },
    size: {
      default: select('Size', Object.values(CheckboxSize), CheckboxSize.MEDIUM)
    }
  },
  methods: {
    handleChange: (value: boolean, checked: boolean) => {
      console.log(`v-model=${checked}`, `@change=${value}`)
    }
  }
})

export const disabled = () => ({
  components: { SCheckbox, SRow, SCol },
  template: `<s-row :gutter="20" style="flex: 1;">
               <s-col :span="6">
                 <s-checkbox disabled size="big">
                   Checkbox
                 </s-checkbox>
               </s-col>
               <s-col :span="6">
                 <s-checkbox disabled border size="big">
                   Checkbox
                 </s-checkbox>
               </s-col>
             </s-row>`
})

export const differentSizeData = Object.values(CheckboxSize).map(size =>
  ({ size, label: size[0].toUpperCase() + size.slice(1) }))
export const differentSize = () => ({
  components: { SCheckbox, SRow, SCol },
  template: `<s-row :gutter="20" style="flex: 1;">
               <template v-for="item in items">
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox :size="item.size">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox border :size="item.size">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
               </template>
             </s-row>`,
  data: () => ({
    items: differentSizeData
  })
})
