import { series } from 'gulp'
import del from 'del'
import { $, path } from 'zx'
import fg from 'fast-glob'
import fs from 'fs/promises'

function resolve(...paths: string[]): string {
  return path.resolve(__dirname, ...paths)
}

async function queryAllSingleFileComponentsInSrc(): Promise<string[]> {
  return fg('src/**/*.vue')
}

export async function clean() {
  await del(['dist-ts', 'dist'])
}

async function vite() {
  await $`yarn build:vite`
}

async function tsc() {
  await $`yarn build:tsc`
}

/**
 * TODO Doesn't work yet. TS emits an error for `SJsonInput`:
 *
 * > The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 */
async function vueDtsGen() {
  const result = await queryAllSingleFileComponentsInSrc()

  await Promise.all(
    result.map(async (componentPath) => {
      await $`yarn vue-dts-gen ${componentPath} --outDir dist-ts`
    }),
  )

  console.log(result)
}

/**
 * Generates `.vue.d.ts` shims for each `.vue` file in the src and copies it into `dist-ts`
 *
 * TODO replace shims with real components declarations
 * @see {@link vueDtsGen}
 */
async function vueDtsShims() {
  const SHIM_CODE = `
import { DefineComponent } from 'vue'
declare const component: DefineComponent<{}, {}, any>
export default component
  `.trimStart()

  await queryAllSingleFileComponentsInSrc().then((sfcs) =>
    Promise.all(
      sfcs.map(async (sfcFile) => {
        const pathRelativeToSrc = path.relative(resolve('src'), sfcFile)
        const outFile = resolve('dist-ts/src', pathRelativeToSrc + '.d.ts')
        return fs.writeFile(outFile, SHIM_CODE)
      }),
    ),
  )
}

async function runApiExtractor() {
  // do not run it with `--local` flag in build script!
  // if you want update api report, run `yarn api:extract:local` locally and commit the result
  await $`yarn api:extract`
}

export default series(clean, tsc, vueDtsShims, vite, runApiExtractor)
