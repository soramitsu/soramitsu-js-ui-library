import { Meta, Story } from '@storybook/vue'

import { SCheckbox, SRow, SCol } from '../components'
import { Size, BorderRadius } from '../types'

const differentSizeData = Object.values(Size).map(size =>
  ({ size, label: size[0].toUpperCase() + size.slice(1) }))

const differentBorderRadiusData = Object.values(BorderRadius).map(borderRadius =>
  ({ borderRadius, label: borderRadius[0].toUpperCase() + borderRadius.slice(1) }))

export default {
  component: SCheckbox,
  title: 'Design System/Components/Checkbox',
  excludeStories: /.*Data$/,
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    border: {
      name: 'Border',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.MINI
    },
    label: {
      name: 'Label',
      control: {
        type: 'text'
      },
      defaultValue: 'Checkbox'
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.MEDIUM
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SCheckbox },
  props: Object.keys(argTypes),
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
               <s-checkbox
                 v-model="vModelValue"
                 :disabled="disabled"
                 :border="border"
                 :border-radius="borderRadius"
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
  })
})

export const disabled: Story = () => ({
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

export const differentSize: Story = () => ({
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
})

export const differentBorderRadius: Story = () => ({
  components: { SCheckbox, SRow, SCol },
  template: `<s-row :gutter="20" style="flex: 1;">
               <template v-for="item in items">
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox :border-radius="item.borderRadius" :value="false">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
                 <s-col :span="6" style="height: 56px; margin-bottom: 20px;">
                   <s-checkbox border :border-radius="item.borderRadius" :value="true">
                     {{ item.label }}
                   </s-checkbox>
                 </s-col>
               </template>
             </s-row>`,
  data: () => ({
    items: differentBorderRadiusData
  })
})
