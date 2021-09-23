import consola from 'consola'
import execa from 'execa'
import chalk from 'chalk'

export async function $(file: string, args?: string[]): Promise<void> {
  consola.log(chalk`{green $} ${file} ${(args || []).join(' ')}`)
  await execa(file, args, { stdio: 'inherit' })
}

export async function main(fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve()
    .then(() => fn())
    .catch((err) => {
      consola.fatal(err)
      process.exit(1)
    })
}
