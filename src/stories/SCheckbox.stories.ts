import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SCheckbox, SRow, SCol } from '../components'
import { Size, BorderRadius } from '../types'

export default {
  component: SCheckbox,
  title: 'Design System/Components/Checkbox',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SCheckbox },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
               <s-checkbox
                 v-model="vModelValue"
                 :disabled="disabled"
                 :border="border"
                 :borderRadius="borderRadius"
                 :size="size"
                 :label="label"
                 @change="(value) => changeValue = value"
               >
               </s-checkbox>
               <span style="margin-top: 20px;">
                 v-model="{{ vModelValue }}", @change="{{ changeValue }}"
               </span>
             </div>`,
  data: () => ({
    vModelValue: true,
    changeValue: true
  }),
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    border: {
      default: boolean('Border', false)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.MINI)
    },
    label: {
      default: text('Label', 'Checkbox')
    },
    size: {
      default: select('Size', Object.values(Size), Size.MEDIUM)
    }
  }
})

export const disabled = () => ({
  components: { SCheckbox, SRow, SCol },
  template: `<s-row :gutter="20" style="flex: 1;">
               <s-col :span="6">
                 <s-checkbox v-model="first" disabled size="big">
                   Checkbox
                 </s-checkbox>
               </s-col>
               <s-col :span="6">
                 <s-checkbox v-model="second" disabled border size="big">
                   Checkbox
                 </s-checkbox>
               </s-col>
             </s-row>`,
  data: () => ({
    first: true,
    second: false
  })
})

export const differentSizeData = Object.values(Size).map(size =>
  ({ size, label: size[0].toUpperCase() + size.slice(1) }))
export const differentSize = () => ({
  components: { SCheckbox, SRow, SCol },
  template: `<s-row :gutter="20" style="flex: 1;">
               <template v-for="item in items">
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox :size="item.size" :value="false">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox border :size="item.size" :value="true">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
               </template>
             </s-row>`,
  data: () => ({
    items: differentSizeData
  })
}
)
export const differentBorderRadiusData = Object.values(BorderRadius).map(borderRadius =>
  ({ borderRadius, label: borderRadius[0].toUpperCase() + borderRadius.slice(1) }))
export const differentBorderRadius = () => ({
  components: { SCheckbox, SRow, SCol },
  template: `<s-row :gutter="20" style="flex: 1;">
               <template v-for="item in items">
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox :borderRadius="item.borderRadius" :value="false">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox border :borderRadius="item.borderRadius" :value="true">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
               </template>
             </s-row>`,
  data: () => ({
    items: differentBorderRadiusData
  })
})
