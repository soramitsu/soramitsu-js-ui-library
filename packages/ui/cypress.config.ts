import { defineConfig } from 'cypress'
import viteConfig from './vite.config'
import { mergeConfig } from 'vite'
import fs from 'fs'

function useAxeCoreReader(on: Cypress.PluginEvents) {
  let content: string | undefined

  on('task', {
    readAxeCoreCached() {
      if (!content) {
        // use the most correct module resolution
        const src = require.resolve('axe-core/axe.min.js')
        content = fs.readFileSync(src, { encoding: 'utf-8' })
      }

      return content
    },
  })
}

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {
      useAxeCoreReader(on)
    },
    video: false,
    specPattern: './cypress/component/**/*.spec.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',

      // additional opts to the main `vite.config.ts`
      viteConfig: mergeConfig(viteConfig, {
        resolve: {
          alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
          },
        },
        optimizeDeps: {
          include: ['cypress-plugin-tab'],
          exclude: ['platform'],
        },
      }),
    },
  },
})
