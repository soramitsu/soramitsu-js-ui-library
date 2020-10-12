import { color, text, number, boolean, withKnobs } from '@storybook/addon-knobs'

import { SSwitch } from '../components/Switch'

export default {
  component: SSwitch,
  title: 'Design System/Components/Switch',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SSwitch },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-switch
                v-model="modelValue"
                :active-color="activeColor"
                :inactive-color="inactiveColor"
                :active-icon-class="activeIconСlass"
                :inactive-icon-class="inactiveIconСlass"
                :active-text="activeText"
                :inactive-text="inactiveText"
                :active-value="activeValue"
                :inactive-value="inactiveValue"
                :name="name"
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
  }),
  props: {
    activeColor: {
      default: color('Active Background Color', 'rgb(208, 2, 27)')
    },
    inactiveColor: {
      default: color('Inactive Background Color', 'rgb(246, 204, 209)')
    },
    activeIconСlass: {
      default: text('Active Icon Сlass', 's-switch-active')
    },
    inactiveIconСlass: {
      default: text('Inactive Icon Сlass', 's-switch-inactive')
    },
    activeText: {
      default: text('Active Text', '')
    },
    inactiveText: {
      default: text('Inactive Text', '')
    },
    activeValue: {
      default: text('Active Value', 'Active Value')
    },
    inactiveValue: {
      default: text('Inactive Value', 'Inactive Value')
    },
    name: {
      default: text('Name', 'switch-example')
    },
    width: {
      default: number('Width', 40)
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  }
})
