import { Meta } from '@storybook/vue3'
import { Component, FunctionalComponent, h } from '@vue/runtime-core'
import { SButton } from '../components/Button'

const meta: Meta = {
  title: 'Example/Button',
}

export default meta

export const Primary = (): Component => ({
  setup() {
    return () => h(SButton, {}, 'Primary button')
  },
})

export const Secondary = (): FunctionalComponent => () => h(SButton, { type: 'secondary' }, 'Secondary button')

export const Rounded = (): FunctionalComponent => () => h(SButton, { rounded: true }, 'Rounded button')
