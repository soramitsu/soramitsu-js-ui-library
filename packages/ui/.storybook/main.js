module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  webpackFinal: (config) => {
    const scssRule = config.module.rules.find(({ test }) => typeof test.test === 'function' && test.test('.scss'))
    // important to include scss to storybook build
    if (scssRule) {
      scssRule.sideEffects = true
    }

    return config
  }
}
