import { test, expect } from 'vitest'
import * as vite from 'vite'
import path from 'path'
import fs from 'fs/promises'

const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths)

const ESM_TREE_SHAKING_TEST_LIB_DIR = 'esm-tree-shaking-test-lib'
const LIB_BUNDLE_ESM_FILE = resolve('../../dist/lib.mjs')
const LIB_BUNDLE_CJS_FILE = resolve('../../dist/lib.cjs')

test('ESM build should be tree-shakeable', async () => {
  await vite.build({
    root: resolve(ESM_TREE_SHAKING_TEST_LIB_DIR),
    build: {
      lib: {
        entry: 'entry.ts',
        formats: ['es'],
        fileName: 'output',
      },
    },
  })

  const outputContents = await fs.readFile(resolve(ESM_TREE_SHAKING_TEST_LIB_DIR, 'dist/output.es.js'), {
    encoding: 'utf-8',
  })

  expect(outputContents.length).toBeLessThan(1_000)
  expect(outputContents).toMatchInlineSnapshot(`
    "function somePureFunction() {
      return 42;
    }
    console.log(somePureFunction());
    "
  `)
})

test('ESM/CJS builds should not have a `data-testid` attribute', async () => {
  for (const file of [LIB_BUNDLE_CJS_FILE, LIB_BUNDLE_ESM_FILE]) {
    const contents = await fs.readFile(file, { encoding: 'utf-8' })
    expect(contents).not.toMatch(/data-testid/)
  }
})
