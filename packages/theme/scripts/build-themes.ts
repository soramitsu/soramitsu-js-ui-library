import themeDefault from '../src/theme-default'
import fs from 'fs/promises'
import path from 'path'
import consola from 'consola'
import chalk from 'chalk'
import makeDir from 'make-dir'

function varsToCss(vars: Map<string, string>, namespaceName = ':root'): string {
  const rows = [...vars].map(([k, v]) => `  ${k}: ${v};`).join('\n')
  return `${namespaceName} {\n${rows}\n}`
}

async function main() {
  const themesOutputDir = path.resolve(__dirname, '../dist/themes')
  await makeDir(themesOutputDir)

  const outputFilename = path.join(themesOutputDir, 'default.css')
  const data = varsToCss(new Map(Object.entries(themeDefault)))
  await fs.writeFile(outputFilename, data)

  consola.success(chalk`{yellow Default} theme written into {blue.bold ${outputFilename}}`)
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
