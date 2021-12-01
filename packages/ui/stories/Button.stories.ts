import { Meta, Story } from '@storybook/vue3'
import { Component, FunctionalComponent, h, Slot } from 'vue'
import { SButton } from '@/lib'

const meta: Meta = {
  title: 'Example/Button',
}

export default meta

interface Props {
  type?: 'primary' | 'secondary'
  rounded?: boolean
}

interface Args {
  props?: Props
  defaultSlot: string | (() => Slot)
}

const Template: Story<Args> = ({ props, defaultSlot }) => ({
  setup() {
    return () => h(SButton, props, { default: typeof defaultSlot === 'string' ? () => defaultSlot : defaultSlot })
  },
})

export const Primary = Template.bind({})
Primary.args = { defaultSlot: 'Primary' }

export const Secondary = Template.bind({})
Secondary.args = {
  props: { type: 'secondary' },
  defaultSlot: 'Secondary',
}

export const Rounded = Template.bind({})
Rounded.args = {
  props: { rounded: true },
  defaultSlot: 'Rounded',
}

// export const Secondary = (): FunctionalComponent => () => h(SButton, { type: 'secondary' }, 'Secondary button')

// export const Rounded = (): FunctionalComponent => () => h(SButton, { rounded: true }, 'Rounded button')
