import { defineConfig } from 'vitest/config'
import windiPlugin from 'vite-plugin-windicss'
import vuePlugin from '@vitejs/plugin-vue'
import type { RootNode, TemplateChildNode } from '@vue/compiler-core'
import iconsPlugin from 'unplugin-icons/vite'
import svgPlugin from '@soramitsu-ui/vite-plugin-svg'
import autoImportPlugin from 'unplugin-auto-import/vite'
import { builtinPresets, type InlinePreset } from 'unimport'
import { produce } from 'immer'
import { match } from 'ts-pattern'
import path from 'path'
import fs from 'fs/promises'
import pkg from './package.json' assert { type: 'json' }
import * as url from 'url'
import { Plugin } from 'vite'

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

function resolve(...args: string[]): string {
  return path.resolve(__dirname, ...args)
}

const vueCompilerTransforms = {
  removeAttribute(attr: string) {
    return (node: RootNode | TemplateChildNode) => {
      if (process.env.NODE_ENV === 'production') {
        if (node.type === 1 /* NodeTypes.ELEMENT */) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i]

            if (p && p.type === 6 /* NodeTypes.ATTRIBUTE */ && p.name === attr) {
              node.props.splice(i, 1)
              i--
            }

            if (
              p &&
              p.type === 7 /* NodeTypes.DIRECTIVE */ &&
              p.name === 'bind' &&
              p.arg &&
              'content' in p.arg &&
              p.arg.content === attr
            ) {
              node.props.splice(i, 1)
              i--
            }
          }
        }
      }
    }
  },
}

function rejectTypeImportsFromPreset(preset: InlinePreset): InlinePreset {
  return produce(preset, (draft) => {
    draft.imports = draft.imports.filter((x) => {
      return match(x)
        .with({ type: true }, () => false)
        .otherwise(() => true)
    })
  })
}

/**
 * When the build is done, it checks the contents of emitted TS declaration file
 * and prints a warning if it detects any auto-imported types
 */
function checkAutoImportedTypesPlugin(checkDts = resolve('auto-imports.d.ts')): Plugin {
  const testExportType = (dtsContent: string): boolean => {
    return /export\s+type\s+\{/.test(dtsContent)
  }

  return {
    name: 'soramitsu-ui:check-auto-imported-types',
    apply: 'build',
    async closeBundle() {
      const content = await fs.readFile(checkDts, { encoding: 'utf-8' })
      if (testExportType(content))
        this.error(`Type export is detected in auto-imports (file: ${path.relative(process.cwd(), checkDts)})`)
    },
  }
}

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'happy-dom',
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@popperjs/core': '@popperjs/core/lib/index',
    },
  },
  server: {
    fs: {
      allow: [resolve('../')],
    },
  },
  plugins: [
    windiPlugin({
      // explicit path in case when cwd is not the `__dirname`
      config: resolve('windi.config.ts'),
    }),
    vuePlugin({
      template: {
        compilerOptions: {
          nodeTransforms: [vueCompilerTransforms.removeAttribute('data-testid')],
        },
      },
    }),
    iconsPlugin(),
    svgPlugin({
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
    autoImportPlugin({
      imports: [
        // We have a problem with bundling `.d.ts` using auto-imported types:
        // AutoImport plugin sets them all in `global`, and when `vue-tsc`
        // transforms the sources, these types are replaced with `globalThis.XXX`.
        // `rollup-plugin-dts` bundles it without a problem, but the bundled file fails
        // to pass TypeScript check, because the auto-imported types are declared in `globalThis`
        // only in the scope of this library, which is incorrect for package distribution.
        // Thus, we simply exclude those few types used across the library that are being
        // auto-imported, and we import them explicitly instead
        rejectTypeImportsFromPreset(builtinPresets.vue),

        // This preset doesn't seem to auto-import any types
        // ...but if it does in the future, I'd add a manual preset as
        // `{ from: '@vueuse/core' }`
        '@vueuse/core',
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    checkAutoImportedTypesPlugin(),
  ],
  build: {
    sourcemap: true,
    cssCodeSplit: false,
    minify: false,
    chunkSizeWarningLimit: 2_000,
    reportCompressedSize: false,
    target: 'esnext',
    lib: {
      entry: resolve('src/lib.ts'),
      formats: ['es', 'cjs'],
      fileName: 'lib',
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies),
    },
  },
})
