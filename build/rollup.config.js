import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
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
    }, {
      name: 'SoramitsuJsUiUmd',
      format: 'umd',
      file: 'lib/soramitsu-js-ui.umd.js',
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
        {
          src: 'src/styles/*.scss',
          dest: 'lib/styles',
          // Replace all imports for scss files which will be used as theming files
          transform: (content, filename) => {
            console.log(filename)
            return content.toString()
              .replace(/~@\/assets\//g, '../assets/')
              // Add scss styles from element-ui
              .replace('../../node_modules/element-ui/packages/theme-chalk/src/index', './element-ui/index')
          }
        },
        { src: 'node_modules/element-ui/packages/theme-chalk/src/*', dest: 'lib/styles/element-ui' },
        { src: 'src/styles/neomorphism/*', dest: 'lib/styles/neomorphism' }
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
      css: false,
      compileTemplate: true
    }),
    scss(),
    resolve(),
    terser(),
    del({
      targets: ['lib/styles/index.d.ts', 'lib/soramitsu-js-ui.esm.css'],
      hook: 'writeBundle'
    })
  ]
}
