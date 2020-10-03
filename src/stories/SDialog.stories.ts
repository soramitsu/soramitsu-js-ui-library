import { text, withKnobs, boolean } from '@storybook/addon-knobs'

import { SDialog, SRow, SButton } from '../components'

export default {
  component: SDialog,
  title: 'Design System/Dialog',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SDialog, SRow, SButton },
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
  props: {
    modal: {
      default: boolean('Modal', true)
    },
    title: {
      default: text('Title', 'Default title')
    },
    fullscreen: {
      default: boolean('fullscreen', false)
    },
    showClose: {
      default: boolean('Show close', true)
    },
    closeOnClickModal: {
      default: boolean('Close on click modal', true)
    },
    closeOnEsc: {
      default: boolean('Close on Esc', true)
    },
    center: {
      default: boolean('Center', false)
    },
    width: {
      default: text('Width', '50%')
    },
    top: {
      default: text('Top', 'auto')
    }
  },
  methods: {
    handleOpen: () => console.log('open'),
    handleClose: () => console.log('close'),
    handleAfterOpened: () => console.log('opened'),
    handleAfterClosed: () => console.log('closed')
  }
})
