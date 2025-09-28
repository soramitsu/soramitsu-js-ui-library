import type { Plugin } from 'vite'
import { compileTemplate } from '@vue/compiler-sfc'
import svgo from 'svgo'
import fs from 'fs/promises'

const SVG_REGEX = /\.svg$/

export interface Options {
  /**
   * @default true
   */
  svgo?: boolean | svgo.OptimizeOptions
}

function createPlugin(opts?: Options): Plugin {
  const svgoOpts = opts?.svgo ?? true

  return {
    name: 'soramitsu-ui-svg',
    enforce: 'pre',
    load: async (id) => {
      if (!SVG_REGEX.test(id)) return

      let svgContents = await fs.readFile(id, 'utf8')

      if (svgoOpts) {
        const result = svgo.optimize(svgContents, svgoOpts === true ? {} : svgoOpts)
        if (result.error) throw new Error(`SVGO failed on ${id}: ${result.error}`)
        svgContents = (result as svgo.OptimizedSvg).data
      }

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svgContents,
        filename: id,
        transformAssetUrls: false,
      })

      return `${code}\n\nexport default { render }`
    },
  }
}

export default createPlugin
