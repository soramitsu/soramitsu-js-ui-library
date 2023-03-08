import { defineConfig, type Plugin } from 'rollup'
import dtsPlugin from 'rollup-plugin-dts'
import aliasPlugin from '@rollup/plugin-alias'
import path from 'path'

const shimCssPlugin = (): Plugin => {
  const CSS_SUFFIX = `.css.d.ts`

  return {
    name: 'soramitsu-ui:shim-css',
    resolveId(id) {
      if (/\.(css|scss|sass)$/.test(id)) return id + CSS_SUFFIX
    },
    load(id) {
      if (id.endsWith(CSS_SUFFIX)) return `declare const css: string\n export default css`
    },
  }
}

export default defineConfig({
  input: 'ts-build/lib.d.ts',
  plugins: [
    aliasPlugin({
      entries: {
        '@': path.resolve(__dirname, 'src'),
      },
    }),
    shimCssPlugin(),
    dtsPlugin(),
  ],
  output: {
    file: 'dist/lid.d.ts',
    format: 'esm',
  },
})
