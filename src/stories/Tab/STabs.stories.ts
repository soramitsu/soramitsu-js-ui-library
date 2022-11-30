import { Meta, Story } from '@storybook/vue'

import { STabs, STab } from '../../components'
import { TabsPosition, TabsType } from '../../components/Tab'
import { BorderRadius } from '../../types'

export default {
  component: STabs,
  title: 'Design System/Components/Tabs 🟣',
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'select',
        options: [...Object.values(TabsType), '––']
      },
      defaultValue: '––'
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    position: {
      name: 'Position',
      control: {
        type: 'select',
        options: Object.values(TabsPosition)
      },
      defaultValue: TabsPosition.TOP
    },
    closable: {
      name: 'Closable',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    addable: {
      name: 'Addable',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    editable: {
      name: 'Editable',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { STabs, STab },
  props: Object.keys(argTypes),
  template: `<s-tabs
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
             </s-tabs>`,
  data: () => ({
    activeName: 'first'
  })
})

export const Configurable = Template.bind({})
