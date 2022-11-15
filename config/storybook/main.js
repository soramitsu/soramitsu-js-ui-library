module.exports = {
  core: {
    builder: '@storybook/builder-webpack5'
  },
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource'
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
