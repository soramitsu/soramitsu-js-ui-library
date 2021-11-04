import { startDevServer } from '@cypress/vite-dev-server'
import Windi from 'vite-plugin-windicss'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueSvg from 'vite-svg-loader'
import path from 'path'
// import { initPlugin } from 'cypress-plugin-snapshots/plugin'

const pluginConfig: Cypress.PluginConfig = (on, config) => {
  on('dev-server:start', (opts) => {
    return startDevServer({
      options: opts,
      viteConfig: {
        plugins: [
          Windi({
            config: path.resolve(__dirname, '../../windi.config.ts'),
          }),
          Vue(),
          VueJsx(),
          VueSvg(),
        ],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, '../../src'),
            vue: 'vue/dist/vue.esm-bundler.js',
          },
        },
      },
    })
  })

  // initPlugin(on, config)

  return config
}

export default pluginConfig
