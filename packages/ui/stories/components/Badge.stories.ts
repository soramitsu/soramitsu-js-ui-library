import { SBadge, type BadgeType, BadgeTypes } from '@/lib'
import type { Meta } from '@storybook/vue3'

const meta = {
  component: defineComponent({
    components: { SBadge },
    props: ['title'],
    template: `
      <SBadge v-bind="$attrs">
        {{ title || $attrs.type }}
      </SBadge>
    `,
  }),
  args: {
    type: 'info' satisfies BadgeType,
    title: '',
    colorBackground: false,
    withBorder: false,
    onlyMarker: false,
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: BadgeTypes,
    },
    colorBackground: { control: 'boolean' },
    withBorder: { control: 'boolean' },
    onlyMarker: { control: 'boolean' },
  },
} satisfies Meta

export default meta

export const Default = {}
