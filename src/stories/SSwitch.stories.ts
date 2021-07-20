import { text, number, boolean, select, withKnobs } from '@storybook/addon-knobs'

import { SSwitch, SDesignSystemProvider } from '../components'
import { DesignSystem } from '../utils/DesignSystem'

export default {
  component: SSwitch,
  title: 'Design System/Components/Switch',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SSwitch, SDesignSystemProvider },
  template: `
          <s-design-system-provider :value="designSystem">
            <div class="s-flex" style="flex: 1; flex-direction: column;">
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
            </div>
          </s-design-system-provider>`,
  data: () => ({
    modelValue: true,
    changeValue: true
  }),
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystem), DesignSystem.DEFAULT)
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
    width: {
      default: number('Width', 40)
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  }
})
