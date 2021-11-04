import { Meta, Story } from '@storybook/vue3'
import { h } from 'vue'

import SSwitch from '../components/Switch/Switch.vue'

const meta: Meta = {
  title: 'Example/Switch',
}

export default meta

const Template: Story = ({ props }) => ({
  setup() {
    return () => h(SSwitch, props)
  },
})

export const Switch = Template.bind({})
Switch.args = {
  props: {
    id: 'id',
  },
}

export const SwitchWithLabel = Template.bind({})
SwitchWithLabel.args = {
  props: {
    id: 'id',
    label: 'Label',
  },
}

export const SwitchDisabledWithLabel = Template.bind({})
SwitchDisabledWithLabel.args = {
  props: {
    id: 'id',
    label: 'Label',
    disabled: true,
    checked: false,
  },
}

export const SwitchDisabledAndCheckedWithLabel = Template.bind({})
SwitchDisabledAndCheckedWithLabel.args = {
  props: {
    id: 'id',
    label: 'Label',
    disabled: true,
  },
}
