import { text, withKnobs, boolean, number, select } from '@storybook/addon-knobs'

import { SSelect, SRow, SCol, SOption } from '../../components'
import { Size, BorderRadius } from '../../types'
import { InputTypes } from '../../components/Select'

export default {
  component: SSelect,
  title: 'Design System/Components/Select',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const differentInputsData = Object.values(InputTypes).map(inputType => ({ inputType, model: '' }))
export const optionsData = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
]

export const configurable = () => ({
  components: { SSelect, SOption, SRow, SCol },
  template: `<s-row style="flex: 1;">
               <s-col v-for="item in items" :key="item.inputType" :span="12" style="padding-bottom: 20px;">
                 <div style="padding-bottom: 10px;">"{{ item.inputType }}" input type</div>
                 <s-select
                   v-model="model"
                   :disabled="disabled"
                   :border-radius="borderRadius"
                   :loading="loading"
                   :size="size"
                   :multiple="multiple"
                   :input-type="item.inputType"
                   :clearable="clearable"
                   :multiple-limit="multipleLimit"
                   :placeholder="placeholder"
                   :multiple-text-prefix="multipleTextPrefix"
                   :loading-text="loadingText"
                   :no-data-text="noDataText"
                   :popper-class="borderRadius"
                   @change="handleChange"
                 >
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
    items: differentInputsData,
    options: optionsData
  }),
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    },
    loading: {
      default: boolean('Loading', false)
    },
    size: {
      default: select('Size', Object.values(Size), Size.BIG)
    },
    multiple: {
      default: boolean('Multiple', false)
    },
    clearable: {
      default: boolean('Clearable', false)
    },
    multipleLimit: {
      default: number('Multiple limit', 0)
    },
    placeholder: {
      default: text('Placeholder', 'Select')
    },
    multipleTextPrefix: {
      default: text('Multiple text prefix', 'Data')
    },
    loadingText: {
      default: text('Loading text', 'Loading')
    },
    noDataText: {
      default: text('No data text', 'No data')
    }
  },
  methods: {
    handleChange: (selected) => console.log('handleChange', selected)
  }
})

export const multiple = () => ({
  components: { SSelect, SOption, SRow, SCol },
  template: `<s-row style="flex: 1;">
               <s-col v-for="item in items" :key="item.inputType" :span="12" style="padding-bottom: 20px;">
                 <div style="padding-bottom: 10px;">"{{ item.inputType }}" input type</div>
                 <s-select
                   v-model="model"
                   multiple
                   :input-type="item.inputType"
                   :multiple-limit="multipleLimit"
                   :multiple-text-prefix="multipleTextPrefix"
                   @change="handleChange"
                 >
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
    items: differentInputsData,
    options: optionsData
  }),
  props: {
    multipleLimit: {
      default: number('Multiple limit', 0)
    },
    multipleTextPrefix: {
      default: text('Multiple text prefix', 'Data')
    }
  },
  methods: {
    handleChange: (selected) => console.log('handleChange', selected)
  }
})

export const disabled = () => ({
  components: { SSelect, SOption, SRow, SCol },
  template: `<s-row style="flex: 1;">
               <s-col v-for="item in items" :key="item.inputType" :span="12" style="padding-bottom: 20px;">
                 <div style="padding-bottom: 10px;">{{ item.label }}</div>
                 <s-select
                   v-model="item.model"
                   disabled
                   :input-type="item.inputType"
                 >
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
    items: differentInputsData.flatMap(item => [
      { ...item, label: `"${item.inputType}" input type` },
      { ...item, model: 'first', label: `"${item.inputType}" input type with selected value` }
    ]),
    options: optionsData
  })
})
