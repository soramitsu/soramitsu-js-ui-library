const path = require('path')
const { default: windi } = require('vite-plugin-windicss')

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
    config.resolve.alias['~'] = path.resolve(__dirname, '..')
    config.plugins.push(windi({ config: path.resolve(__dirname, '../windi.config.ts') }))

    return config
  },
}
