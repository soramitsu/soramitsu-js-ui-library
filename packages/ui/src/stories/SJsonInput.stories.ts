import { Story, Meta } from '@storybook/vue3'

import SJsonInput from '../components/Input/SJsonInput.vue'

const meta: Meta = {
  title: 'Example/JSON Input',
  component: SJsonInput,
  argTypes: {
    value: {
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

interface Props {
  value: any
}

const Template: Story<Props> = (args: unknown) => ({
  components: { SJsonInput },
  setup() {
    return { args }
  },
  data: () => ({
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
  }),
  template: '<SJsonInput :value="value" v-bind="args" />',
})

export const Primary = Template.bind({})

// Configurable.args = { height: '500px' }
