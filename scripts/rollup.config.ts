import { defineConfig, RollupOptions } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import windi from 'rollup-plugin-windicss'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import path from 'path'

function uiLibConfigs(): RollupOptions[] {
  const OUTPUT_FILE_NAME_FORMAT = '[name].[format].js'

  const UI_DIST = 'packages/ui/dist'

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
      input: [...inputs()].map((x) => path.join('packages/ui/src', x)),
      external: ['vue', 'jsoneditor', /^lodash/],
      plugins: [
        ...windi({ config: path.join(__dirname, '../packages/ui/windi.config.ts') }),
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
      input: 'tmp-declaration/packages/ui/src/lib.d.ts',
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
        file: 'packages/ui/dist/lib.d.ts',
        format: 'esm',
      },
    },
  ]
}

function themeLibConfigs(): RollupOptions[] {
  return [
    {
      input: 'packages/theme/src/lib.ts',
      external: [/^windicss/],
      plugins: [esbuild()],
      output: [
        {
          file: 'packages/theme/dist/lib.esm.js',
          format: 'esm',
        },
        {
          file: 'packages/theme/dist/lib.cjs.js',
          format: 'cjs',
        },
      ],
    },
    {
      input: 'tmp-declaration/packages/theme/src/lib.d.ts',
      plugins: [dts()],
      output: {
        file: 'packages/theme/dist/lib.d.ts',
        format: 'esm',
      },
    },
  ]
}

export default defineConfig([...uiLibConfigs(), ...themeLibConfigs()])
