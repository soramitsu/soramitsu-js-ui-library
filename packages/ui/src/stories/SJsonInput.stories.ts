import { Meta } from '@storybook/vue3'
import { Component } from 'vue'

import SJsonInput from '../components/Input/SJsonInput.vue'

const meta: Meta = {
  title: 'Example/JSON Input',
  component: SJsonInput,
  argTypes: {
    modelValue: {
      description: 'Description from story',
      type: { name: 'string', required: false },
      control: {
        type: 'text',
      },
    },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    onClick: {},
  },
}

export default meta

export const Primary = (): Component => ({
  components: { SJsonInput },
  setup() {
    return {
      value: {
        object: {
          string: 'I am a string!',
          array: [1, 2, 3],
          null: null,
          boolean: true,
        },
        anotherArray: [1, 2, 3.5],
        boolean: false,
        null: null,
        number: 21,
      },
    }
  },
  // template: 'wtf',
  template: `<SJsonInput :model-value="value" />`,
})
