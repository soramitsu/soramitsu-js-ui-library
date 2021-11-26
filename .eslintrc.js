/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const fs = require('fs')

const UI_PACKAGE_AUTO_IMPORTS_DTS = path.resolve(__dirname, './packages/ui/auto-imports.d.ts')

function parseAutoImportsDts(contents) {
  const matchResults = contents.matchAll(/^\s+const (\w+): typeof import/gm)
  return Array.from(matchResults, ([, word]) => word)
}

/**
 * Extracts auto-imports from generated `.d.ts` and collects them into readonly-globals
 * so ESLint could know about them
 */
function extractAutoImportGlobals(dtsFile) {
  const contents = fs.readFileSync(dtsFile, { encoding: 'utf-8' })
  const parsed = parseAutoImportsDts(contents)
  return parsed.reduce((acc, word) => {
    acc[word] = 'readonly'
    return acc
  }, {})
}

module.exports = {
  root: true,
  extends: ['alloy', 'alloy/typescript', 'plugin:vue/vue3-recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    'vue/html-indent': ['warn', 2],

    // make possible `/// <reference...`
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
  },
  overrides: [
    {
      files: ['**/cypress/**/*.{j,t}s', '**/*.cy.{js,ts}'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true,
      },
    },
    {
      files: ['**/packages/ui/**/*.{ts,vue,js}'],
      globals: extractAutoImportGlobals(UI_PACKAGE_AUTO_IMPORTS_DTS),
    },
    {
      files: ['**/*.spec.{js,ts}'],
      env: {
        jest: true,
      },
    },
  ],
}
