import { Meta, Story } from '@storybook/vue'

import { SRadio, SRadioGroup, SRow, SCol, SDesignSystemProvider } from '../components'
import { Size } from '../types'

const radioData = [
  { label: 'first', title: 'First' },
  { label: 'second', title: 'Second' }
]

export default {
  component: SRadio,
  title: 'Design System/Components/Radio 🟣',
  excludeStories: /.*Data$/,
  argTypes: {
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.MEDIUM
    },
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
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SRadio, SRow, SCol, SDesignSystemProvider },
  props: Object.keys(argTypes),
  template: `<s-row style="flex: 1;" :gutter="20">
               <s-col v-for="item in items" :key="item.label" :span="6">
                 <s-radio
                   v-model="vModelValue"
                   :label="item.label"
                   :disabled="disabled"
                   :size="size"
                   :border="border"
                   @change="(value) => changeValue = value"
                 >
                   {{ item.title }}
                 </s-radio>
               </s-col>
               <s-col :span="12" style="margin-top: 20px;">
                 <span>v-model="{{ vModelValue }}", @change="{{ changeValue }}"</span>
               </s-col>
             </s-row>`,
  data: () => ({
    vModelValue: 'first',
    changeValue: '',
    items: radioData
  })
})

export const disabled: Story = () => ({
  components: { SRadio, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
              <s-radio
                v-for="item in items"
                :key="item.label"
                v-model="model"
                :label="item.label"
                disabled
              >
                {{ item.title }}
              </s-radio>
            </s-row>`,
  data: () => ({
    model: 'first',
    items: radioData
  })
})

export const withBorders: Story = () => ({
  components: { SRadio, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
              <s-radio
                v-for="item in items"
                :key="item.label"
                v-model="model"
                :label="item.label"
                border
              >
                {{ item.title }}
              </s-radio>
            </s-row>`,
  data: () => ({
    model: 'first',
    items: radioData
  })
})

export const radioButtonGroup: Story = (args, { argTypes }) => ({
  components: { SRadio, SRadioGroup, SRow },
  props: Object.keys(argTypes),
  template: `<s-row class="s-flex" style="flex-wrap: wrap;">
              <s-radio-group v-model="model" :size="size" :disabled="disabled">
                <s-radio
                  v-for="item in items"
                  :key="item.label"
                  :label="item.label"
                  :size="size"
                  :is-radio-button="true"
                >
                  {{ item.title }}
                </s-radio>
              </s-radio-group>
              <div style="margin-top: 20px; width: 100%;">
                v-model="{{ model }}"
              </div>
            </s-row>`,
  data: () => ({
    model: 'first',
    items: radioData
  })
})
