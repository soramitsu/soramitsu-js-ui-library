import { Meta, Story } from '@storybook/vue3'
import { ref } from 'vue'

import { SCheckbox } from '../components/Checkbox';
import { CheckboxSize } from '../components/Checkbox/consts';

const meta: Meta = {
  title: 'Example/Checkbox',
  component: SCheckbox,
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    indeterminate: {
      control: { type: 'boolean' }
    },
    border: {
      control: { type: 'boolean' }
    },
    size: {
      control: { type: 'select', options: CheckboxSize }
    }
  },
  args: {
    label: 'Checkbox',
    disabled: false,
    indeterminate: false,
    border: false,
    size: CheckboxSize.MEDIUM
  },
}

export default meta

const Template: Story = (args: any) => ({
  components: { SCheckbox },
  setup() {
    const model = ref(false);

    return { args, model };
  },
  template: `
  <div>
    <div>model: {{ model }}</div>
    <SCheckbox v-bind="args" v-model="model" />
  </div>
  `,
});

export const Single = Template.bind({});
Single.args = {
};
