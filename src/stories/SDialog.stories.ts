import { Meta, Story } from '@storybook/vue'

import { SDialog, SRow, SButton } from '../components'
import { BorderRadius } from '../types'

export default {
  component: SDialog,
  title: 'Design System/Components/Dialog 🟣',
  argTypes: {
    modal: {
      name: 'Modal',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    title: {
      name: 'Title',
      control: {
        type: 'text'
      },
      defaultValue: 'Default title'
    },
    fullscreen: {
      name: 'Fullscreen',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    showClose: {
      name: 'Show close',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    closeOnClickModal: {
      name: 'Close on click modal',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    closeOnEsc: {
      name: 'Close on Esc',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    center: {
      name: 'Center',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    width: {
      name: 'Width',
      control: {
        type: 'text'
      },
      defaultValue: '50%'
    },
    top: {
      name: 'Top',
      control: {
        type: 'text'
      },
      defaultValue: 'auto'
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SDialog, SRow, SButton },
  props: Object.keys(argTypes),
  template: `<s-row
               class="s-flex"
               style="flex: 1; justify-content: space-between; align-items: center; height: 400px;"
             >
               <s-button size="medium" @click="visible = true">Open Dialog</s-button>
               <s-dialog
                 :visible.sync="visible"
                 :modal="modal"
                 :title="title"
                 :width="width"
                 :fullscreen="fullscreen"
                 :top="top"
                 :border-radius="borderRadius"
                 :show-close="showClose"
                 :close-on-click-modal="closeOnClickModal"
                 :close-on-esc="closeOnEsc"
                 :center="center"
                 @open="handleOpen"
                 @close="handleClose"
                 @after-opened="handleAfterOpened"
                 @after-closed="handleAfterClosed"
               >
                 <span>Default content</span>
                 <template #footer>
                   <s-button type="primary" size="medium" @click="visible = false">Confirm</s-button>
                   <s-button type="secondary" size="medium" @click="visible = false">Cancel</s-button>
                 </template>
               </s-dialog>
             </s-row>`,
  data: () => ({
    visible: false
  }),
  methods: {
    handleOpen: () => console.log('open'),
    handleClose: () => console.log('close'),
    handleAfterOpened: () => console.log('opened'),
    handleAfterClosed: () => console.log('closed')
  }
})
