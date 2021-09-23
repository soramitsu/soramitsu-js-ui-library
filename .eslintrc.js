module.exports = {
  root: true,
  extends: ['alloy', 'alloy/typescript', 'plugin:vue/vue3-recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/html-indent': ['warn', 2],

    // make possible `/// <reference...`
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
  },
  overrides: [
    {
      files: ['**/cypress/**/*.{j,t}s'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      env: {
        'cypress/globals': true,
      },
    },
    // WIP
    // {
    //   files: ['**/packages/ui/src/**/*.spec.{j,t}s'],
    //   env: {
    //     jest: true,
    //   },
    // },
  ],
}
