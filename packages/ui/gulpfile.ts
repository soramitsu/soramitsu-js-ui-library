import { series } from 'gulp'
import del from 'del'
import { $ } from 'zx'

async function clean() {
  await del(['dist-ts', 'dist'])
}

async function rollup() {
  await $`yarn rollup -c`
}

async function tsc() {
  await $`yarn tsc --outDir dist-ts`
}

export default series(clean, tsc, rollup)
