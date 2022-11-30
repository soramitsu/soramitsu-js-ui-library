import { Meta, Story } from '@storybook/vue'

import { SDivider, SRow } from '../components'
import { ContentPosition, DividerDirection, DividerType } from '../components/Divider'

export default {
  component: SDivider,
  title: 'Design System/Components/Divider',
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'select',
        options: Object.values(DividerType)
      },
      defaultValue: DividerType.SECONDARY
    },
    direction: {
      name: 'Direction',
      control: {
        type: 'select',
        options: Object.values(DividerDirection)
      },
      defaultValue: DividerDirection.HORIZONTAL
    },
    contentPosition: {
      name: 'Content position',
      control: {
        type: 'select',
        options: Object.values(ContentPosition)
      },
      defaultValue: ContentPosition.CENTER
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SRow, SDivider },
  props: Object.keys(argTypes),
  template: `
  <s-row class="s-flex" style="flex: 1; flex-direction: column;">
    <span>First text paragraph</span>
    <s-divider
      :style="direction === 'vertical' ? { height: '56px' } : {}"
      :type="type"
      :direction="direction"
      :content-position="contentPosition"
    >
      Content between divider
    </s-divider>
    <span>Second text paragraph</span>
  </s-row>
  `
})

export const Configurable = Template.bind({})
