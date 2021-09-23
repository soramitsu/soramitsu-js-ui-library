import { $, main } from '@soramitsu-ui/script-utils'
import consola from 'consola'
import del from 'del'

main(async () => {
  await del(['dist/*', 'tmp-declaration/*'])

  await $('pnpm', ['build:declaration'])
  await $('pnpm', ['build:rollup'])
  await $('pnpm', ['build:themes'])

  consola.success('@soramitsu-ui/theme build done!')
})
