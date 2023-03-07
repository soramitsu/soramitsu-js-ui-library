/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  // TODO use other stories as well
  stories: ['../stories/**/Alert.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
