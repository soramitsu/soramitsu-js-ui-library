const path = require('path');
const {
  loadConfigFromFile,
  mergeConfig
} = require('vite');
function resolve(...paths) {
  return path.resolve(__dirname, '..', ...paths);
}
module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  /**
   * @param {import('vite').UserConfig} config
   */
  async viteFinal(config) {
    const {
      config: mainConfig
    } = await loadConfigFromFile({
      mode: 'development',
      command: 'serve'
    }, resolve('vite.config.ts'));

    // vue plugin is already presented in storybook's config, so we need to deduplicate it
    mainConfig.plugins = mainConfig.plugins.filter(x => !/vite:vue/.test(x.name));
    return mergeConfig(config, mainConfig);
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
};