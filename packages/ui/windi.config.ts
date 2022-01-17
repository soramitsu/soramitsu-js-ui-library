import { defineConfig } from 'windicss/helpers'
import { windicssPreset, THEME_DEFAULT, windicssPluginTheme, windicssPluginTypography } from '@soramitsu-ui/theme'

export default defineConfig({
  extract: {
    include: [
      'src/**/*.vue',
      'cypress/component/**/*.spec.cy.{js,ts}',
      'cypress/component/**/*.vue',
      'stories/**/*.stories.{js,ts}',
    ],
  },
  presets: [windicssPreset],
  plugins: [windicssPluginTheme('default', THEME_DEFAULT), windicssPluginTypography()],
})
