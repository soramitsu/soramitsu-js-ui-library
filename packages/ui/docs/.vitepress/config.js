module.exports = {
  title: 'Soramitsu UI Library',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/intro' },
      { text: 'Components', link: '/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          link: '/guide/intro',
        },
        { text: 'Testing', link: '/guide/testing' },
      ],
      '/components/': [
        { text: 'Button', link: '/components/Button/' },
        { text: 'SJsonInput', link: '/components/json-input/' },
      ],
    },
  },
}
