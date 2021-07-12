import { text, withKnobs, boolean, select } from '@storybook/addon-knobs'

import { SDialog, SRow, SButton, SDesignSystemProvider } from '../components'
import { BorderRadius } from '../types'
import { DesignSystemTypes } from '../utils/DesignSystem'

export default {
  component: SDialog,
  title: 'Design System/Components/Dialog',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SDialog, SRow, SButton, SDesignSystemProvider },
  template: `<s-design-system-provider :value="designSystem">
              <s-row
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
              </s-row>
            </s-design-system-provider>`,
  data: () => ({
    visible: false
  }),
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystemTypes), DesignSystemTypes.DEFAULT)
    },
    modal: {
      default: boolean('Modal', true)
    },
    title: {
      default: text('Title', 'Default title')
    },
    fullscreen: {
      default: boolean('fullscreen', false)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
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
