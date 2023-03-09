import { Plugin } from 'vite'
import { compileTemplate } from '@vue/compiler-sfc'
import svgo, { Config as SvgoConfig } from 'svgo'
import fs from 'fs/promises'

const SVG_REGEX = /\.svg$/

export interface Options {
  /**
   * @default true
   */
  svgo?: boolean | SvgoConfig
}

function createPlugin(opts?: Options): Plugin {
  const svgoCfg = opts?.svgo ?? true

  return {
    name: 'soramitsu-ui-svg',
    enforce: 'pre',
    load: async (id) => {
      if (!SVG_REGEX.test(id)) return

      let svgContents = await fs.readFile(id, 'utf8')

      if (svgoCfg) {
        try {
          const result = svgo.optimize(svgContents, svgoCfg === true ? {} : svgoCfg)
          svgContents = result.data
        } catch (err) {
          console.error(`SVGO failed`)
          throw err
        }
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
