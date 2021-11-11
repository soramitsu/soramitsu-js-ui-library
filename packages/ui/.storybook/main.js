const path = require('path')
const { default: Windi } = require('vite-plugin-windicss')
const Icons = require('unplugin-icons/vite')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  /**
   * @param {import('vite').UserConfig} config
   */
  async viteFinal(config, { configType }) {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.plugins.push(
      Windi({
        config: path.resolve(__dirname, '../windi.config.ts'),
      }),
      Icons(),
    )

    return config
  },
}
