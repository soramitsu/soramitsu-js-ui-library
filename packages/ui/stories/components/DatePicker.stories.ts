import { SDatePicker, type DatePickerType } from '@/lib'
import type { Meta } from '@storybook/vue3'

const meta = {
  component: SDatePicker,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['day', 'range', 'pick'] as DatePickerType[],
    },
    time: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    type: 'day',
    time: true,
    disabled: false,
  },
} as Meta

export default meta

export const Default = {}
