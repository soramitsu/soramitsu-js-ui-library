import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SDatePicker, SRow, SCol } from '../components'
import { PickerAlignment, PickerTypes, InputTypes } from '../components/DatePicker'

export default {
  component: SDatePicker,
  title: 'Design System/Date Picker',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SDatePicker },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
               <s-date-picker
                 v-model="vModelValue"
                 :unlink-panels="unlinkPanels"
                 :type="type"
                 :readonly="readonly"
                 :disabled="disabled"
                 :clearable="clearable"
                 :align="align"
                 :input-type="inputType"
                 placeholder="Select date"
                 start-placeholder="From"
                 end-placeholder="To"
                 @change="(value) => changeValue = value"
               >
               </s-date-picker>
               <span style="margin-top: 40px;">
                 v-model="{{ vModelValue }}"
               </span>
               <span style="margin-top: 40px;">
                 @change="{{ changeValue }}"
               </span>
             </div>`,
  data: () => ({
    vModelValue: '',
    changeValue: ''
  }),
  props: {
    unlinkPanels: {
      default: boolean('Unlink Panels', false)
    },
    type: {
      default: select('Type', Object.values(PickerTypes), PickerTypes.DATE)
    },
    inputType: {
      default: select('Input Type', Object.values(InputTypes), InputTypes.INPUT)
    },
    readonly: {
      default: boolean('Readonly', false)
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    clearable: {
      default: boolean('Clearable', true)
    },
    align: {
      default: select('Align', Object.values(PickerAlignment), PickerAlignment.LEFT)
    }
  },
  methods: {
    handleChange: (value: any, model: any) => console.log(value, model)
  }
})

export const differentTypesData = Object.values(PickerTypes).map(type => {
  const label = type[0].toUpperCase() + type.slice(1)
  const data = { type, label, inputType: InputTypes.SELECT, model: '' } as any
  if ([PickerTypes.DATERANGE, PickerTypes.DATETIMERANGE, PickerTypes.MONTHRANGE].includes(type)) {
    data.startPlaceholder = 'From'
    data.endPlaceholder = 'To'
  } else {
    data.placeholder = `Select ${type}`
  }
  return data
}).concat([
  PickerTypes.DATE,
  PickerTypes.DATES,
  PickerTypes.DATETIME,
  PickerTypes.MONTH,
  PickerTypes.WEEK,
  PickerTypes.YEAR
].map(type => {
  const label = `${type[0].toUpperCase() + type.slice(1)} with input-type="input"`
  const data = { type, label, inputType: InputTypes.INPUT, model: '' } as any
  data.placeholder = `Select ${type}`
  return data
}))
export const withDifferentTypes = () => ({
  components: { SCol, SRow, SDatePicker },
  template: `<s-row style="flex: 1;" :gutter="20">
               <s-col v-for="item in selectItems" :key="item.label" :span="6" style="padding-bottom: 20px;">
                 <div style="padding-bottom: 10px;">{{ item.label }}</div>
                 <s-date-picker
                   v-model="item.model"
                   :type="item.type"
                   :input-type="item.inputType"
                   :start-placeholder="item.startPlaceholder"
                   :end-placeholder="item.endPlaceholder"
                   :placeholder="item.placeholder"
                 >
                 </s-date-picker>
               </s-col>
               <s-col v-for="item in inputItems" :key="item.label" :span="12" style="padding-bottom: 20px;">
                 <div style="padding-bottom: 10px;">{{ item.label }}</div>
                 <s-date-picker
                   v-model="item.model"
                   :type="item.type"
                   :input-type="item.inputType"
                   :placeholder="item.placeholder"
                 >
                 </s-date-picker>
               </s-col>
             </s-row>`,
  data: () => ({
    selectItems: differentTypesData.filter(item => item.inputType === InputTypes.SELECT),
    inputItems: differentTypesData.filter(item => item.inputType === InputTypes.INPUT)
  })
})

export const differentRangeTypesData = [
  PickerTypes.DATERANGE,
  PickerTypes.DATETIMERANGE,
  PickerTypes.MONTHRANGE
].map(type => {
  const label = type[0].toUpperCase() + type.slice(1)
  return { type, label, model: '', startPlaceholder: 'From', endPlaceholder: 'To' }
})
export const withUnlinkPanels = () => ({
  components: { SCol, SRow, SDatePicker },
  template: `<s-row style="flex: 1;" :gutter="20">
               <s-col v-for="item in items" :key="item.label" :span="6" style="padding-bottom: 20px;">
                 <div style="padding-bottom: 10px;">{{ item.label }}</div>
                 <s-date-picker
                   v-model="item.model"
                   :type="item.type"
                   :start-placeholder="item.startPlaceholder"
                   :end-placeholder="item.endPlaceholder"
                   unlink-panels
                 >
                 </s-date-picker>
               </s-col>
             </s-row>`,
  data: () => ({
    items: differentRangeTypesData
  })
})

export const disabledData = Object.values(InputTypes).map(inputType => {
  return { type: PickerTypes.DATE, placeholder: 'Select date', inputType }
}).flatMap(item => [{ ...item, model: '' }, { ...item, model: new Date() }])
export const disabled = () => ({
  components: { SCol, SRow, SDatePicker },
  template: `<s-row style="flex: 1;" :gutter="20">
               <s-col v-for="item in items" :key="item.label" :span="6" style="padding-bottom: 20px;">
                 <s-date-picker
                   v-model="item.model"
                   :input-type="item.inputType"
                   :type="item.type"
                   :placeholder="item.placeholder"
                   disabled
                 >
                 </s-date-picker>
               </s-col>
             </s-row>`,
  data: () => ({
    items: disabledData
  })
})

export const withAdditionalOptions = () => ({
  components: { SCol, SRow, SDatePicker },
  template: `<s-row style="flex: 1;" :gutter="20">
               <s-col>
                 <s-date-picker
                   v-model="model"
                   input-type="input"
                   type="date"
                   placeholder="Select date"
                   :picker-options="pickerOptions"
                 >
                 </s-date-picker>
               </s-col>
             </s-row>`,
  data: () => ({
    model: '',
    pickerOptions: {
      disabledDate (time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [{
        text: 'Today',
        onClick (picker) {
          picker.$emit('pick', new Date())
        }
      }, {
        text: 'Yesterday',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      }, {
        text: 'A week ago',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
          console.log(picker)
        }
      }]
    }
  })
})
