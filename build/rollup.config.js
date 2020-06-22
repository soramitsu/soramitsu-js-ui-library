import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
import css from 'rollup-plugin-css-porter'
import scss from 'rollup-plugin-scss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'SoramitsuJsUi',
      file: 'lib/soramitsu-js-ui.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    'tslib',
    'vue'
  ],
  plugins: [
    copy({
      targets: [
        { src: 'src/assets/*', dest: 'lib/assets' },
        { src: 'src/styles/*', dest: 'lib/styles' }
      ]
    }),
    typescript({
      typescript: require('typescript'),
      objectHashIgnoreUnknownHack: true,
      module: 'esnext',

      tsconfig: 'tsconfig.json',
      tsconfigOverride: { exclude: ['node_modules', 'tests', 'src/stories'] }
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    scss(),
    css(),
    resolve(),
    terser(),
    del({
      targets: ['lib/styles/index.d.ts', 'lib/plugins/'],
      hook: 'writeBundle'
    })
  ]
}
