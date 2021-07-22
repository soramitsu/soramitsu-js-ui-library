import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
import scss from 'rollup-plugin-scss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import multiInput from 'rollup-plugin-multi-input'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  'tslib',
  'vue'
]

export default {
  input: [
    'src/index.ts',
    'src/types/DesignSystem.ts',
    'src/types/Locale.ts',
    'src/types/Theme.ts',
    'src/locale/index.ts',
    'src/plugins/*.ts',
    'src/store/index.ts',
    'src/utils/*.ts',
    'src/directives/index.ts',
    'src/components/*/**/index.ts'
  ],
  output: {
    format: 'esm',
    dir: 'lib'
    // sourcemap: true We don't need it because of d.ts files
  },
  external (id) {
    return external.includes(id.split('/')[0]) ||
      /element-ui\/lib\//.test(id)
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/assets/*', dest: 'lib/assets' },
        {
          src: 'src/styles/*.(scss|ts)',
          dest: 'lib/styles',
          // Replace all imports for scss files which will be used as theming files
          transform: (content) => {
            return content.toString()
              .replace(/~@\/assets\//g, '../assets/')
              // Add scss styles from element-ui
              .replace('../../node_modules/element-ui/packages/theme-chalk/src/index', './element-ui/index')
          }
        },
        { src: 'node_modules/element-ui/packages/theme-chalk/src/*', dest: 'lib/styles/element-ui' },
        { src: 'src/styles/neumorphism/*', dest: 'lib/styles/neumorphism' }
      ]
    }),
    multiInput({
      relative: 'src/'
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
      targets: [
        'lib/styles/index.d.ts',
        'bundle.css'
        // TODO: find a way how to remove this dependencies
        // 'lib/BorderRadiusMixin-**.js',
        // 'lib/SizeMixin-**.js',
        // 'lib/DesignSystem-**.js',
        // 'lib/DesignSystemInject-**.js',
        // 'lib/normalize-component-**.js',
        // 'lib/components-**.js',
        // 'lib/consts-**.js',
        // 'lib/index-**.js'
      ],
      hook: 'writeBundle'
    })
  ]
}
