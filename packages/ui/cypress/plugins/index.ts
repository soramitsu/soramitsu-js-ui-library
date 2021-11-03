import { startDevServer } from '@cypress/vite-dev-server'
import Windi from 'vite-plugin-windicss'
import Vue from '@vitejs/plugin-vue'
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
        ],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, '../../src'),
          },
        },
      },
    })
  })

  // initPlugin(on, config)

  return config
}

export default pluginConfig
