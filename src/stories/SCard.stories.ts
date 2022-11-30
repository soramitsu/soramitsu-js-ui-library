import { Meta, Story } from '@storybook/vue'

import { SCard, SRow, SDropdown, SDropdownItem } from '../components'
import { CardShadow } from '../components/Card'
import { BorderRadius, Status, Size } from '../types'

export default {
  component: SCard,
  title: 'Design System/Components/Card 🟣',
  argTypes: {
    shadow: {
      name: 'Shadow',
      control: {
        type: 'select',
        options: Object.values(CardShadow)
      },
      defaultValue: CardShadow.HOVER
    },
    header: {
      name: 'Header',
      control: {
        type: 'text'
      }
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    status: {
      name: 'Status',
      control: {
        type: 'select',
        options: Object.values(Status)
      },
      defaultValue: Status.DEFAULT
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.BIG
    },
    clickable: {
      name: 'Clickable',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    primary: {
      name: 'Primary',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    pressed: {
      name: 'Pressed',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
} as Meta

export const Configurable: Story = (args, { argTypes }) => ({
  components: { SCard, SRow, SDropdown, SDropdownItem },
  props: Object.keys(argTypes),
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
  methods: {
    handleClick: () => alert('Card component was clicked')
  }
})
