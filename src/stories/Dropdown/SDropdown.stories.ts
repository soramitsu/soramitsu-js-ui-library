import { text, withKnobs, select } from '@storybook/addon-knobs'

import { SDropdown, SDropdownItem, SRow } from '../../components'

export default {
  component: SDropdown,
  title: 'Design System/Dropdown',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SDropdown, SDropdownItem },
  template: `<s-dropdown type="button" split-button>
               Dropdown
               <template slot="menu">
                 <s-dropdown-item>Action 1</s-dropdown-item>
                 <s-dropdown-item>Action 2</s-dropdown-item>
                 <s-dropdown-item>Action 3</s-dropdown-item>
                 <s-dropdown-item>Action 4</s-dropdown-item>
               </template>
             </s-dropdown>`
})
