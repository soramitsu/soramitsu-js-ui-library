import { withKnobs, boolean } from '@storybook/addon-knobs'

import { SDropdown, SDropdownItem } from '../../components'

export default {
  component: SDropdownItem,
  title: 'Design System/Dropdown/DropdownItem',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SDropdown, SDropdownItem },
  template: `<s-dropdown>
               Main menu
               <template slot="menu">
                 <s-dropdown-item>Action 1</s-dropdown-item>
                 <s-dropdown-item :disabled="disabled" :divided="divided">Action 2</s-dropdown-item>
                 <s-dropdown-item>Action 3</s-dropdown-item>
                 <s-dropdown-item :disabled="disabled" :divided="divided">Action 4</s-dropdown-item>
               </template>
             </s-dropdown>`,
  props: {
    disabled: {
      default: () => boolean('Disabled', false)
    },
    divided: {
      default: () => boolean('Divided', false)
    }
  }
})
