import { text, number, boolean, object, withKnobs } from '@storybook/addon-knobs'

import { SSlider } from '../components/Slider'

export default {
  component: SSlider,
  title: 'Design System/Components/Slider',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SSlider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-slider
                v-model="modelValue"
                :min="min"
                :max="max"
                :show-tooltip="showTooltip"
                :tooltip-class="tooltipClass"
                :step="step"
                :show-stops="showStops"
                :disabled="disabled"
                @change="(value) => changeValue = value"
              />
              <span style="margin-top: 20px;">
                v-model="{{ modelValue }}", @change="{{ changeValue }}"
              </span>
            </div>`,
  data: () => ({
    modelValue: 0,
    changeValue: 0
  }),
  props: {
    min: {
      default: number('Minimum value', 0)
    },
    max: {
      default: number('Maximum value', 100)
    },
    showTooltip: {
      default: boolean('Show Tooltip', true)
    },
    tooltipClass: {
      default: text('Custom class name for the tooltip', '')
    },
    step: {
      default: number('Step size', 1)
    },
    showStops: {
      default: boolean('Show Stops', false)
    },
    disabled: {
      default: boolean('Disabled', false)
    }
  }
})

export const withCustomLabelAttribute = () => ({
  components: { SSlider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-slider
                v-model="modelValue"
                :label="label"
                @change="(value) => changeValue = value"
              />
              <span style="margin-top: 20px;">
                v-model="{{ modelValue }}", @change="{{ changeValue }}", label="{{ label }}"
              </span>
            </div>`,
  data: () => ({
    modelValue: 0,
    changeValue: 0,
    label: 'Custom slider label value'
  })
})

export const withInitValue = () => ({
  components: { SSlider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-slider
                v-model="modelValue"
                @change="(value) => changeValue = value"
              />
              <span style="margin-top: 20px;">
                v-model="{{ modelValue }}", @change="{{ changeValue }}"
              </span>
            </div>`,
  data: () => ({
    modelValue: 50,
    changeValue: 0
  })
})

// TODO: Сustomize input styles for disabled variant
// TODO: Add select for input size variants
export const withInput = () => ({
  components: { SSlider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-slider
                v-model="modelValue"
                :show-input="showInput"
                :show-input-controls="showInputControls"
                :input-size="inputSize"
                :debounce="debounce"
                @change="(value) => changeValue = value"
              />
              <span style="margin-top: 20px;">
                v-model="{{ modelValue }}", @change="{{ changeValue }}"
              </span>
            </div>`,
  data: () => ({
    modelValue: 0,
    changeValue: 0
  }),
  props: {
    showInput: {
      default: boolean('Show Input', true)
    },
    showInputControls: {
      default: boolean('Show Input Controls', true)
    },
    inputSize: {
      default: text('Size of the input box', 'small')
    },
    debounce: {
      default: number('Debounce delay when typing (in milliseconds)', 300)
    }
  }
})

export const withRange = () => ({
  components: { SSlider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-slider
                v-model="modelValue"
                :range="range"
                :marks="range && marks"
                @change="(value) => changeValue = value"
              />
              <span style="margin-top: 20px;">
                v-model="{{ modelValue }}", @change="{{ changeValue }}"
              </span>
            </div>`,
  data: () => ({
    modelValue: [0, 0],
    changeValue: [0, 0]
  }),
  props: {
    range: {
      default: boolean('Range', true)
    },
    marks: {
      default: object('Marks', {
        0: '0°C',
        8: '8°C',
        37: '37°C'
      })
    }
  }
})

export const verticalMode = () => ({
  components: { SSlider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
              <s-slider
                v-model="modelValue"
                :height="height"
                @change="(value) => changeValue = value"
              />
              <span style="margin-top: 20px;">
                v-model="{{ modelValue }}", @change="{{ changeValue }}"
              </span>
            </div>`,
  data: () => ({
    modelValue: 0,
    changeValue: 0
  }),
  props: {
    height: {
      default: text('Height', '200px')
    }
  }
})
