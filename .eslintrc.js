module.exports = {
  root: true,
  extends: ['alloy', 'alloy/typescript', 'plugin:vue/vue3-recommended', 'plugin:vuejs-accessibility/recommended'],
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

    // to fix windicss scanning in cases like `:class="{ invisible: true }"`
    'vue/quote-props': ['warn', 'always'],

    // make possible `/// <reference...`
    'spaced-comment': ['error', 'always', { markers: ['/'] }],

    '@typescript-eslint/consistent-type-definitions': 'off',

    // FIXME
    'vuejs-accessibility/no-static-element-interactions': 'off',

    "vuejs-accessibility/label-has-for": [
      "error",
      {
        // all labels should have `for` attr
        "required": "id",
      }
    ]
  },
  overrides: [
    {
      files: ['**/cypress/**/*.{j,t}s', '**/*.cy.{js,ts}', 'cypress.config.ts'],
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
      files: ['**/packages/ui/stories/**/*.stories.ts', '**/*.cy.{js,ts}'],
      rules: {
        // It is OK to define a lot of components in stories or tests
        'vue/one-component-per-file': 'off',

        // We don't need such strictness in stories
        'vue/require-prop-types': 'off'
      },
    },
    {
      files: ['**/*.spec.ts', '**/*.spec.cy.ts'],
      rules: {
        'max-nested-callbacks': 'off',

        // We don't need such strictness in tests
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off'
      },
    },

    // FIXME - temporary disables to fix them in a different PRs
    {
      files: ['**/ui/src/components/Select/**/*.vue'],
      rules: {
        'vuejs-accessibility/click-events-have-key-events': 'off',
      },
    },
  ],
}
