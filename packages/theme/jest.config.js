module.exports = {
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': ['esbuild-jest', { sourcemap: true }],
  },
}
