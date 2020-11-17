import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SRadio, SRadioGroup, SRow, SCol } from '../components'
import { Size } from '../types'

export default {
  component: SRadio,
  title: 'Design System/Components/Radio',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const radioData = [
  { label: 'first', title: 'First' },
  { label: 'second', title: 'Second' }
]

export const configurable = () => ({
  components: { SRadio, SRow, SCol },
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
  }),
  props: {
    size: {
      default: select('Size', Object.values(Size), Size.MEDIUM)
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    border: {
      default: boolean('Border', false)
    }
  }
})

export const disabled = () => ({
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

export const withBorders = () => ({
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

export const radioButtonGroup = () => ({
  components: { SRadio, SRadioGroup, SRow },
  template: `<s-row class="s-flex" style="flex-wrap: wrap;">
              <s-radio-group v-model="model" :size="size" :disabled="disabled">
                <s-radio
                  v-for="item in items"
                  :key="item.label"
                  v-model="model"
                  :label="item.label"
                  :size="size"
                  :isRadioButton="true"
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
  }),
  props: {
    size: {
      default: select('Size', Object.values(Size), Size.MEDIUM)
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  }
})
