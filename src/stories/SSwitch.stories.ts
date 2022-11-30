import { SSwitch } from '../components'

export default {
  component: SSwitch,
  title: 'Design System/Components/Switch 🟣',
  excludeStories: /.*Data$/,
  argTypes: {
    activeText: {
      name: 'Active Text',
      control: {
        type: 'text'
      },
      defaultValue: ''
    },
    inactiveText: {
      name: 'Inactive Text',
      control: {
        type: 'text'
      },
      defaultValue: ''
    },
    activeValue: {
      name: 'Active Value',
      control: {
        type: 'text'
      },
      defaultValue: 'Active Value'
    },
    inactiveValue: {
      name: 'Inactive Value',
      control: {
        type: 'text'
      },
      defaultValue: 'Inactive Value'
    },
    width: {
      name: 'Width',
      control: {
        type: 'number',
        min: 40
      },
      defaultValue: 40
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
}

export const configurable = (args, { argTypes }) => ({
  components: { SSwitch },
  props: Object.keys(argTypes),
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
               <s-switch
                 v-model="modelValue"
                 :active-text="activeText"
                 :inactive-text="inactiveText"
                 :active-value="activeValue"
                 :inactive-value="inactiveValue"
                 :width="width"
                 :disabled="disabled"
                 @change="(value) => changeValue = value"
               />
               <span style="margin-top: 20px;">
                 v-model="{{ modelValue }}", @change="{{ changeValue }}"
               </span>
             </div>`,
  data: () => ({
    modelValue: true,
    changeValue: true
  })
})
