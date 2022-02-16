import { defineConfig } from 'vite'
import Windi from 'vite-plugin-windicss'
import Vue from '@vitejs/plugin-vue'
import { NodeTypes, RootNode, TemplateChildNode } from '@vue/compiler-core';
import Icons from 'unplugin-icons/vite'
import Svg from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

function resolve(...args: string[]): string {
  return path.resolve(__dirname, ...args)
}

const vueCompilerTransforms = {
  removeAttribute(attr: string) {
    return (node: RootNode | TemplateChildNode) => {
      if (process.env.NODE_ENV === 'production') {
        if (node.type === NodeTypes.ELEMENT) {
          for(let i = 0; i < node.props.length; i++){
            const p = node.props[i]

            if (p && p.type === NodeTypes.ATTRIBUTE && p.name === attr) {
              node.props.splice(i, 1)
              i--
            }
          }
        }
      }
    }
  }
}

export default defineConfig({
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
    Vue(({
      template: {
        compilerOptions: {
          nodeTransforms: [vueCompilerTransforms.removeAttribute('data-testid')]
        }
      }
    })),
    Icons(),
    Svg({
      svgoConfig: {
        plugins: [{ name: 'removeViewBox', active: false }]
      }
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
    lib: {
      entry: resolve('src/lib.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `lib.${format}.js`,
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
