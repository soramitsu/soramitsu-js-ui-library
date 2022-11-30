import { Meta, Story } from '@storybook/vue'

import { SDropdown, SDropdownItem } from '../../components'

export default {
  component: SDropdownItem,
  title: 'Design System/Components/Dropdown/DropdownItem',
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    divided: {
      name: 'Divided',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SDropdown, SDropdownItem },
  props: Object.values(argTypes),
  template: `<s-dropdown>
               Main menu
               <template slot="menu">
                 <s-dropdown-item>Action 1</s-dropdown-item>
                 <s-dropdown-item :disabled="disabled" :divided="divided">Action 2</s-dropdown-item>
                 <s-dropdown-item>Action 3</s-dropdown-item>
                 <s-dropdown-item :disabled="disabled" :divided="divided">Action 4</s-dropdown-item>
               </template>
             </s-dropdown>`
})
