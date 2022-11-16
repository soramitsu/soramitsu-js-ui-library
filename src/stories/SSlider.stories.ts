import { Meta, Story } from '@storybook/vue'

import { SSlider, SliderInputSize } from '../components/Slider'

export default {
  component: SSlider,
  title: 'Design System/Components/Slider',
  excludeStories: /.*Data$/,
  argTypes: {
    min: {
      name: 'Minimum value',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    },
    max: {
      name: 'Maximum value',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 100
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    step: {
      name: 'Step size',
      control: {
        type: 'number',
        min: 1
      },
      defaultValue: 1
    },
    label: {
      name: 'Label',
      control: {
        type: 'text'
      }
    },
    showTooltip: {
      name: 'Show Tooltip',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    showStops: {
      name: 'Show Stops',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showInput: {
      name: 'Show Input',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showInputControls: {
      name: 'Show Input Controls',
      control: {
        type: 'boolean'
      },
      if: { arg: 'showInput' },
      defaultValue: false
    },
    inputSize: {
      name: 'Size of the input box',
      control: {
        type: 'select',
        options: Object.values(SliderInputSize)
      },
      if: { arg: 'showInput' },
      defaultValue: SliderInputSize.SMALL
    },
    debounce: {
      name: 'Debounce delay when typing (in milliseconds)',
      control: {
        type: 'number',
        min: 0
      }
    },
    range: {
      name: 'Range',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    marks: {
      name: 'Range Marks',
      control: {
        type: 'object'
      },
      if: { arg: 'range' },
      defaultValue: {
        0: '0°C',
        8: '8°C',
        37: '37°C'
      }
    },
    height: {
      name: 'Height',
      control: {
        type: 'text'
      }
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SSlider },
  props: Object.keys(argTypes),
  template: `
  <div class="s-flex" style="flex: 1; flex-direction: column;">
    <s-slider
      v-model="modelValue"
      :min="min"
      :max="max"
      :show-tooltip="showTooltip"
      :step="step"
      :show-stops="showStops"
      :disabled="disabled"
      :label="label"
      :show-input="showInput"
      :show-input-controls="showInputControls"
      :input-size="inputSize"
      :debounce="debounce"
      :height="height"
      :range="range"
      @change="(value) => changeValue = value"
    />
    <span style="margin-top: 20px;">
      v-model="{{ modelValue }}", @change="{{ changeValue }}"
    </span>
  </div>
  `,
  data: () => ({
    modelValue: args.range ? [0, 0] : 0,
    changeValue: args.range ? [0, 0] : 0
  })
})

export const Configurable = Template.bind({})

export const WithCustomLabelAttribute = Template.bind({})
WithCustomLabelAttribute.args = {
  label: 'Custom Label'
}

export const WithInput = Template.bind({})
WithCustomLabelAttribute.args = {
  showInput: true,
  showInputControls: true,
  debounce: 300
}

export const VerticalMode = Template.bind({})
VerticalMode.args = {
  height: '200px'
}

export const WithRange = Template.bind({})
WithRange.args = {
  range: true
}
