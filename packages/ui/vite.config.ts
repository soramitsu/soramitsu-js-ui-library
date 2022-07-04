import { defineConfig } from 'vitest/config'
import Windi from 'vite-plugin-windicss'
import Vue from '@vitejs/plugin-vue'
import { RootNode, TemplateChildNode } from '@vue/compiler-core'
import Icons from 'unplugin-icons/vite'
import Svg from '@soramitsu-ui/vite-plugin-svg'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

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
          }
        }
      }
    }
  },
}

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  plugins: [
    Windi({
      // explicit path in case when cwd is not the `__dirname`
      config: resolve('windi.config.ts'),
    }),
    Vue({
      template: {
        compilerOptions: {
          nodeTransforms: [vueCompilerTransforms.removeAttribute('data-testid')],
        },
      },
    }),
    Icons(),
    Svg({
      svgo: {
        plugins: [{ name: 'removeViewBox', active: false }],
      },
    }),
    AutoImport({
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
      fileName: (format) => `lib.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      output: { chunkFileNames: '[name].[format].js' },
      external: [
        'vue',
        /^lodash/,
        'jsoneditor',
        '@popperjs/core',
        /^@vueuse/,
        '@soramitsu-ui/theme',
        'body-scroll-lock',
        'focus-trap',
      ],
    },
  },
})
