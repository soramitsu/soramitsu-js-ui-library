import type { StorybookConfig } from '@storybook/vue3-vite'

export default {
  stories: [
    {
      directory: '../stories/components',
      titlePrefix: 'Components',
      files: '**/*.stories.@(js|jsx|ts|tsx)',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
} satisfies StorybookConfig
