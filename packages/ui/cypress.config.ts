import { defineConfig } from 'cypress'
import viteConfig from './vite.config.mts'
import fs from 'fs'

function useAxeCoreReader(on: Cypress.PluginEvents) {
  let content: string | undefined

  on('task', {
    async readAxeCoreCached() {
      if (!content) {
        const { createRequire } = await import('module')
        // resolve relative to the current working directory so Node walks up as usual
        const requireFromCwd = createRequire(`${process.cwd()}/package.json`)
        const src = requireFromCwd.resolve('axe-core/axe.min.js')
        content = fs.readFileSync(src, { encoding: 'utf-8' })
      }

      return content
    },
  })
}

function dedupe<T>(values: T[] | undefined, extras: T[]): T[] {
  return Array.from(new Set([...(values ?? []), ...extras]))
}

const componentViteConfig = {
  ...viteConfig,
  resolve: {
    ...viteConfig.resolve,
    alias: {
      ...(viteConfig.resolve?.alias ?? {}),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  optimizeDeps: {
    ...viteConfig.optimizeDeps,
    include: dedupe(viteConfig.optimizeDeps?.include, ['cypress-plugin-tab']),
    exclude: dedupe(viteConfig.optimizeDeps?.exclude, ['platform']),
  },
} satisfies typeof viteConfig

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

      // additional opts to the main `vite.config.mts`
      viteConfig: componentViteConfig,
    },
  },
})
