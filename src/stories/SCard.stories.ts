import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SCard, SRow, SDropdown, SDropdownItem } from '../components'
import { CardShadow } from '../components/Card'

export default {
  component: SCard,
  title: 'Design System/Card',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SCard, SRow, SDropdown, SDropdownItem },
  template: `<s-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-card style="width: 80%;" :shadow="shadow" :clickable="clickable" @click="handleClick">
                 <template slot="header">
                   <div class="flex" style="justify-content: space-between; padding-right: 20px;">
                     <span>{{ header }}</span>
                     <s-dropdown type="ellipsis">
                       Menu
                       <template #menu>
                         <s-dropdown-item>First</s-dropdown-item>
                         <s-dropdown-item>Second</s-dropdown-item>
                         <s-dropdown-item>Third</s-dropdown-item>
                       </template>
                     </s-dropdown>
                   </div>
                 </template>
                 <div v-for="o in 4" :key="o" style="margin-bottom: 18px;">
                   {{'List item ' + o }}
                 </div>
               </s-card>
             </s-row>`,
  props: {
    shadow: {
      default: select('Shadow', Object.values(CardShadow), CardShadow.HOVER)
    },
    header: {
      default: text('Header', 'Card header')
    },
    clickable: {
      default: boolean('Clickable', false)
    }
  },
  methods: {
    handleClick: () => alert('Card component was clicked')
  }
})
