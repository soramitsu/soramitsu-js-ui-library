import type { Preview } from '@storybook/vue3'

import 'virtual:windi.css'
import './custom.scss'

export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
} satisfies Preview
