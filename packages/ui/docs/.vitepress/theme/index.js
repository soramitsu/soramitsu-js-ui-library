import DefaultTheme from 'vitepress/theme'
import './custom.scss'
import 'virtual:windi.css'
import Layout from './Layout.vue'

import DemoSection from './components/DemoSection.vue'

/**
 * @type {import('vitepress').Theme}
 */
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DemoSection', DemoSection)
  },
}
