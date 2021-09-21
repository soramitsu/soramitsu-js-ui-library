import { UserConfig } from 'vitepress'

interface NavItem {
  text: string
  link?: string
  children?: NavItem[]
}

interface ThemeConfig {
  nav?: NavItem[]
  sidebar?: Record<string, NavItem[]>
}

const ComponentsSideBar: NavItem[] = [
  { text: 'Button', link: '/components/button/' },
  { text: 'JSON Input', link: '/components/json-input/' },
]

const config: UserConfig<ThemeConfig> = {
  title: 'Soramitsu UI Library',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
    ],
    sidebar: {
      '/components/': ComponentsSideBar,
    },
  },
}

export default config
