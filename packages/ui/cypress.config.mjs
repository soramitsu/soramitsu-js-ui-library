import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'cypress'
import { loadConfigFromFile } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { config: viteConfig } = await loadConfigFromFile(
  { command: 'serve', mode: process.env.NODE_ENV ?? 'development' },
  path.resolve(__dirname, 'vite.config.mts'),
)

function useAxeCoreReader(on) {
  let content

  on('task', {
    async readAxeCoreCached() {
      if (!content) {
        const requireFromCwd = createRequire(`${process.cwd()}/package.json`)
        const src = requireFromCwd.resolve('axe-core/axe.min.js')
        content = fs.readFileSync(src, { encoding: 'utf-8' })
      }

      return content
    },
  })
}

function dedupe(values, extras) {
  return Array.from(new Set([...(values ?? []), ...extras]))
}

const componentViteConfig = {
  ...viteConfig,
  resolve: {
    ...viteConfig?.resolve,
    alias: {
      ...(viteConfig?.resolve?.alias ?? {}),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  optimizeDeps: {
    ...viteConfig?.optimizeDeps,
    include: dedupe(viteConfig?.optimizeDeps?.include, ['cypress-plugin-tab']),
    exclude: dedupe(viteConfig?.optimizeDeps?.exclude, ['platform']),
  },
}

export default defineConfig({
  component: {
    setupNodeEvents(on) {
      useAxeCoreReader(on)
    },
    video: false,
    specPattern: './cypress/component/**/*.spec.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      // reuse the standard Vite config but adjust it for Cypress component tests
      viteConfig: componentViteConfig,
    },
  },
})
