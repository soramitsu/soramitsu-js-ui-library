import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { linkTo } from '@storybook/addon-links'

import { SButton, ButtonSize, ButtonTypes } from '@/components'

export default {
  component: SButton,
  title: 'Button',
  decorators: [
    withKnobs as any,
    () => ({
      template: `<div class="flex" style="padding: 20px;">
                          <story/>
                        </div>`
    })
  ]
}

export const withDifferentTypes = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button type="primary">Primary</s-button>
               <s-button type="secondary">Secondary</s-button>
               <s-button type="tertiary" tooltip="Tertiary" icon="back"></s-button>
             </el-row>`
})

export const withDifferentSize = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button size="big">Big</s-button>
               <s-button size="medium">Medium</s-button>
               <s-button size="small">Small</s-button>
             </el-row>`
})

export const disabled = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button type="primary" disabled>Primary</s-button>
               <s-button type="secondary" disabled>Secondary</s-button>
               <s-button type="tertiary" tooltip="Tertiary" icon="back" disabled></s-button>
             </el-row>`
})

export const configurable = () => ({
  components: { SButton },
  template: `<s-button
               :disabled="disabled"
               :tooltip="tooltip"
               :icon="type === 'tertiary' ? 'back' : ''"
               :type="type"
               :size="size">
               {{ type !== 'tertiary' ? 'Configurable' : '' }}
            </s-button>`,
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    type: {
      default: select('Type', Object.values(ButtonTypes), ButtonTypes.PRIMARY)
    },
    size: {
      default: select('Size', Object.values(ButtonSize), ButtonSize.BIG)
    },
    tooltip: {
      default: text('Tooltip', '')
    }
  }
})

/* export const withLink = () => ({
  components: { SButton },
  template: '<s-button @click="action">Hello Button</s-button>',
  methods: { action: linkTo('Button', 'With Some Emoji') }
})

export const withSomeEmoji = () => ({
  components: { SButton },
  template: '<s-button>😀 😎 👍 💯</s-button>'
})
*/
