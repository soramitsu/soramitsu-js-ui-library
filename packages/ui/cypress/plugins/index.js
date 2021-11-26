/* eslint-disable @typescript-eslint/no-require-imports */

const { startDevServer } = require('@cypress/vite-dev-server')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('dev-server:start', async (options) => {
    return startDevServer({
      options,
      // additional opts to the main `vite.config.ts`
      viteConfig: {
        resolve: {
          alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
          },
        },
      },
    })
  })

  return config
}
