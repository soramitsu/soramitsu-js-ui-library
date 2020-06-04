module.exports = {
  stories: ['../../src/**/*.stories.(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        babelOptions: {
          presets: [
            [
              '@vue/cli-plugin-babel/preset',
              {
                jsx: false
              }
            ]
          ]
        }
      }
    },
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource'
  ]
}
