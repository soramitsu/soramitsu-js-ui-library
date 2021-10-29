import { series } from 'gulp'
import { $ } from 'zx'
import del from 'del'
import buildThemes from './scripts/build-themes'

async function clean() {
  console.log(process.cwd())
  await del(['dist', 'dist-ts', 'static'])
}

async function rollup() {
  await $`yarn rollup -c`
}

async function tsc() {
  await $`yarn tsc --outDir dist-ts`
}

export default series(clean, tsc, rollup, buildThemes)
