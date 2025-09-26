import fs from 'node:fs'
import { createRequire } from 'node:module'
import { register } from 'esbuild-register/dist/node.js'
import { defineConfig } from 'cypress'

const { unregister } = register({
  // allow runtime import of the TypeScript Vite config when Cypress boots
  extensions: ['.ts', '.mts'],
  target: 'esnext',
  format: 'esm',
})

let viteConfig
try {
  ;({ default: viteConfig } = await import('./vite.config.mts'))
} finally {
  unregister()
}

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
