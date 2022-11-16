import { Meta, Story } from '@storybook/vue'

import { SJsonInput, SRow } from '../components'

const jsonData = {
  object: {
    string: 'I am a string!',
    array: [1, 2, 3],
    null: null,
    boolean: true
  },
  anotherArray: [1, 2, 3.5],
  boolean: false,
  null: null,
  number: 21
}

export default {
  component: SJsonInput,
  title: 'Design System/Components/JSON Input',
  excludeStories: /.*Data$/,
  argTypes: {
    height: {
      name: 'Height',
      control: {
        type: 'text'
      },
      defaultValue: '400px'
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    readonly: {
      name: 'Readonly',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SJsonInput, SRow },
  props: Object.keys(argTypes),
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-json-input
                 v-model="json"
                 :height="height"
                 :disabled="disabled"
                 :readonly="readonly"
               >
               </s-json-input>
             </s-row>`,
  data: () => ({
    json: jsonData
  })
})

export const Configurable = Template.bind({})
