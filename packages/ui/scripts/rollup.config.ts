import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import windi from 'rollup-plugin-windicss'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import path from 'path'

/**
 * Yields paths relative to src
 */
function* inputs(): Generator<string> {
  yield 'lib.ts'
  for (const component of ['Button', 'Input']) {
    yield `components/${component}/index.ts`
  }
}

const OUTPUT_FILE_NAME_FORMAT = '[name].[format].js'

export default defineConfig([
  // main build chunks - esm + cjs
  {
    input: [...inputs()].map((x) => path.join('src', x)),
    external: ['vue', 'jsoneditor', /^lodash/],
    plugins: [
      ...windi({ config: path.resolve(__dirname, '../windi.config.ts') }),
      esbuild(),
      vue(),
      postcss(),
      commonjs(),
      nodeResolve(),
    ],
    output: [
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: OUTPUT_FILE_NAME_FORMAT,
        chunkFileNames: OUTPUT_FILE_NAME_FORMAT,
      },
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: OUTPUT_FILE_NAME_FORMAT,
        chunkFileNames: OUTPUT_FILE_NAME_FORMAT,
      },
    ],
  },
  // TS declaration build
  {
    input: 'tmp-declaration/src/lib.d.ts',
    plugins: [
      {
        name: 'vue-declaration-stub',
        resolveId(id) {
          if (id.endsWith('.vue')) return id + '.d.ts'
          return null
        },
        load(id) {
          if (id.endsWith('.vue.d.ts')) {
            return `
              import { DefineComponent } from 'vue'
              const component: DefineComponent<{}, {}, any>
              export default component
            `
          }
        },
      },
      dts(),
    ],
    output: {
      file: 'dist/lib.d.ts',
      format: 'esm',
    },
  },
])
