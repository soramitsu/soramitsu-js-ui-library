import consola from 'consola'
import execa from 'execa'
import del from 'del'
import chalk from 'chalk'

async function $(file: string, args?: string[]): Promise<void> {
  consola.log(chalk`{green $} ${file} ${(args || []).join(' ')}`)
  await execa(file, args, { stdio: 'inherit' })
}

async function main() {
  await del(['dist/*', 'tmp-declaration/*'])
  await $('yarn', ['build:declaration'])
  await $('yarn', ['build:rollup'])
  await $('yarn', ['--cwd', 'packages/theme', 'build:themes'])

  consola.success('UI build is done! ^_^')
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
