import path from 'path'
import consola from 'consola'
import execa from 'execa'
import del from 'del'
import chalk from 'chalk'

async function $(file: string, args?: string[]): Promise<void> {
  consola.log(chalk`{green $} ${file} ${(args || []).join(' ')}`)
  await execa(file, args, { stdio: 'inherit' })
}

async function main() {
  consola.info('Clearing dist & declaration build dir')
  await del(['dist/*', 'tmp-declaration/*'])

  consola.info('Running typecheck')
  await $('pnpm', ['typecheck'])

  consola.info('Building declaration')
  await $('pnpm', ['build:declaration'])

  consola.info('Rolling up')
  await $('pnpm', ['build:rollup'])

  consola.success('UI build is done! ^_^')
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
