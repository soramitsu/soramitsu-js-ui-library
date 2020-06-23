import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
import scss from 'rollup-plugin-scss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import modify from 'rollup-plugin-modify'

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
    // Replace all imports for css bundle
    modify({
      find: '~@/assets/',
      replace: '~assets/'
    }),
    copy({
      targets: [
        { src: 'src/assets/*', dest: 'lib/assets' },
        {
          src: 'src/styles/*',
          dest: 'lib/styles',
          // Replace all imports for scss files which will be used as theming files
          transform: (content) => content.toString().replace(/~@\/assets\//g, '../assets/')
        }
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
    resolve(),
    terser(),
    del({
      targets: ['lib/styles/index.d.ts', 'lib/plugins/'],
      hook: 'writeBundle'
    })
  ]
}
