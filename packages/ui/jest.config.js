/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  transform: {
    '^.+\\.(ts|js)$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  testEnvironment: 'jsdom',
}
