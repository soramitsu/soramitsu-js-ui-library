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
      extends: ['./packages/ui/.eslintrc-auto-import.json'],
    },
    {
      files: ['**/*.spec.{js,ts}'],
      env: {
        jest: true,
      },
    },
  ],
}
