import { Meta, Story } from '@storybook/vue'

import { SScrollbar } from '../components'

export default {
  component: SScrollbar,
  title: 'Design System/Components/Scrollbar',
  argTypes: {
    native: {
      name: 'Native',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    noresize: {
      name: 'Noresize',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    }
  }
} as Meta

export const Template: Story = (args, { argTypes }) => ({
  components: { SScrollbar },
  props: Object.keys(argTypes),
  template: `
            <s-scrollbar :native="native" :noresize="noresize" style="background-color: var(--s-color-base-background);">
              <div style="height: 200px;">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, blanditiis expedita? Earum eligendi pariatur quaerat quos expedita ab quibusdam ratione veniam in, mollitia fuga repudiandae?</p>
              </div>
            </s-scrollbar>`
})

export const Configurable = Template.bind({})
