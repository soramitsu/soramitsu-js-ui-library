module.exports = {
    extends: ['alloy', 'alloy/typescript', 'plugin:vue/vue3-recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'vue/html-indent': ['warn', 2],
    },
}
