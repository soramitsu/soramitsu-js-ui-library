import { defineConfig } from 'vitest/config'
import windiPlugin from 'vite-plugin-windicss'
import vuePlugin from '@vitejs/plugin-vue'
import type { RootNode, TemplateChildNode } from '@vue/compiler-core'
import iconsPlugin from 'unplugin-icons/vite'
import svgPlugin from '@soramitsu-ui/vite-plugin-svg'
import autoImportPlugin from 'unplugin-auto-import/vite'
import path from 'path'
import pkg from './package.json' assert { type: "json"}
import * as url from 'url';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

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
      allow: [resolve('../')]
    }
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
      imports: ['vue', '@vueuse/core'],
      eslintrc: {
        enabled: true,
      },
    }),
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
