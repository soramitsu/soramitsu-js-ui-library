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

const createTemplate = (initialModel: any): Story => (args: any) => ({
  components: { SCheckbox },
  setup() {
    const model = ref(initialModel);
    const { items, ...rest } = args;

    const checkboxes = Array.isArray(items)
      ? items.map(item => ({ ...rest, ...item }))
      : [rest];

    return { checkboxes, model };
  },
  template: `
  <div>
    <div>model: {{ model }}</div>
    <SCheckbox
      v-for="(item, index) in checkboxes"
      :key="index"
      v-bind="item"
      v-model="model"
    />
  </div>
  `,
})

export const Single = (createTemplate(false)).bind({});
Single.args = {
};

export const Multiple = (createTemplate([])).bind({});
Multiple.args = {
  items: [
    {
      label: 'One',
      value: 1
    },
    {
      label: 'Two',
      value: 2
    },
    {
      label: 'Three',
      value: 3
    },
  ]
};
