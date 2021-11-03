import { series } from 'gulp'
import del from 'del'
import { $ } from 'zx'
import fg from 'fast-glob'
// import { globby } from 'globby'

async function clean() {
  await del(['dist-ts', 'dist'])
}

async function rollup() {
  await $`yarn rollup -c`
}

async function tsc() {
  await $`yarn tsc --outDir dist-ts`
}

/**
 * TODO Doesn't work yet. TS emits an error for `SJsonInput`:
 *
 * > The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
async function vueDtsGen() {
  const result = await fg('src/**/*.vue')

  await Promise.all(
    result.map(async (componentPath) => {
      await $`yarn vue-dts-gen ${componentPath} --outDir dist-ts`
    }),
  )

  console.log(result)
}

export default series(clean, tsc, rollup)
