import { defineConfig, RollupOptions } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'

import { ThemePreset } from '../src/core'
import themeDefault from '../src/theme-default'

function configForTheme(name: string, theme: ThemePreset): RollupOptions {
  return {
    input: 'virtual',
    plugins: [
      {
        name: 'theme2css',
        resolveId: (id) => (id === 'virtual' ? 'v.css' : null),
        load: () => {
          const rows = Object.entries(theme)
            .map(([k, v]) => `  ${k}: ${v};`)
            .join('\n')
          return `:root {\n${rows}\n}`
        },
      },
    ],
    output: {
      file: `dist/themes/${name}.css`,
    },
  }
}

export default defineConfig([
  // {
  //   input: 'src/lib.ts',
  //   external: [/^windicss/],
  //   plugins: [esbuild()],
  //   output: [
  //     {
  //       file: 'dist/lib.esm.js',
  //       format: 'esm',
  //     },
  //     {
  //       file: 'dist/lib.cjs.js',
  //       format: 'cjs',
  //     },
  //   ],
  // },
  // {
  //   input: 'tmp-declaration/lib.d.ts',
  //   plugins: [dts()],
  //   output: {
  //     file: 'dist/lib.d.ts',
  //     format: 'esm',
  //   },
  // },
  configForTheme('default', themeDefault),
])
