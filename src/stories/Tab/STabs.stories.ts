import { boolean, select, withKnobs } from '@storybook/addon-knobs'

import { STabs, STab, SDesignSystemProvider } from '../../components'
import { BorderRadius } from '../../types'
import { TabsPosition, TabsType } from '../../components/Tab'
import { DesignSystem } from '../../utils/DesignSystem'

export default {
  component: STabs,
  title: 'Design System/Components/Tabs',
  decorators: [withKnobs]
}

export const defaultUsage = () => ({
  components: { STabs, STab, SDesignSystemProvider },
  template: `
            <s-design-system-provider :value="designSystem">
              <s-tabs
               v-model="activeName"
               :type="type"
               :border-radius="borderRadius"
               :position="position"
               :closable="closable"
               :addable="addable"
               :editable="editable"
              >
               <s-tab label="First tab" name="first">First</s-tab>
               <s-tab label="Second tab" name="second">Second</s-tab>
               <s-tab label="Third tab" name="third">Third</s-tab>
              </s-tabs>
            </s-design-system-provider>`,
  data: () => ({
    activeName: 'first'
  }),
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystem), DesignSystem.DEFAULT)
    },
    type: {
      default: select('Type', [...Object.values(TabsType), '––'], '––')
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    },
    position: {
      default: select('Position', Object.values(TabsPosition), TabsPosition.TOP)
    },
    closable: {
      default: boolean('Closable', false)
    },
    addable: {
      default: boolean('Addable', false)
    },
    editable: {
      default: boolean('Editable', false)
    }
  }
})
