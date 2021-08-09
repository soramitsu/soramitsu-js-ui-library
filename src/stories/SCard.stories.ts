import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SCard, SRow, SDropdown, SDropdownItem } from '../components'
import { CardShadow } from '../components/Card'
import { BorderRadius, Status, Size } from '../types'

export default {
  component: SCard,
  title: 'Design System/Components/Card 🟣',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SCard, SRow, SDropdown, SDropdownItem },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-card style="width: 80%;" :shadow="shadow" :border-radius="borderRadius" :clickable="clickable" :pressed="pressed" :primary="primary" :status="status" :size="size" @click="handleClick">
                 <template slot="header" v-if="header">
                   <div class="s-flex" style="justify-content: space-between; padding-right: 20px;">
                     <span>{{ header }}</span>
                     <s-dropdown type="ellipsis" :border-radius="borderRadius">
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
      default: text('Header', 'Card header', undefined)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    },
    status: {
      default: select('Status', Object.values(Status), Status.DEFAULT)
    },
    size: {
      default: select('Size', Object.values(Size), Size.BIG)
    },
    clickable: {
      default: boolean('Clickable', false)
    },
    primary: {
      default: boolean('Primary', false)
    },
    pressed: {
      default: boolean('Pressed', false)
    }
  },
  methods: {
    handleClick: () => alert('Card component was clicked')
  }
})
