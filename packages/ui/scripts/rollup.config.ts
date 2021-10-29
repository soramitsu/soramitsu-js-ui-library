import { defineConfig, RollupOptions } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import windi from 'rollup-plugin-windicss'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import path from 'path'

const resolve = (...paths: string[]): string => path.resolve(__dirname, '../', ...paths)

function uiLibConfigs(): RollupOptions[] {
  const OUTPUT_FILE_NAME_FORMAT = '[name].[format].js'

  const UI_DIST = 'dist'

  /**
   * Yields paths relative to src
   */
  function* inputs(): Generator<string> {
    yield 'lib.ts'
    for (const component of ['Button', 'Input']) {
      yield `components/${component}/index.ts`
    }
  }

  return [
    // main build chunks - esm + cjs
    {
      input: [...inputs()].map((x) => resolve('src', x)),
      external: ['vue', 'jsoneditor', /^lodash/],
      plugins: [
        ...windi({ config: resolve('windi.config.ts') }),
        esbuild(),
        vue(),
        postcss(),
        commonjs(),
        nodeResolve(),
      ],
      output: [
        {
          dir: UI_DIST,
          format: 'esm',
          entryFileNames: OUTPUT_FILE_NAME_FORMAT,
          chunkFileNames: OUTPUT_FILE_NAME_FORMAT,
        },
        {
          dir: UI_DIST,
          format: 'cjs',
          entryFileNames: OUTPUT_FILE_NAME_FORMAT,
          chunkFileNames: OUTPUT_FILE_NAME_FORMAT,
        },
      ],
    },
    // TS declaration build
    // TODO vue-dts-gen
    {
      input: 'dist-ts/src/lib.d.ts',
      external: 'vue',
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
  ]
}

export default defineConfig([...uiLibConfigs()])
