import { defineConfig } from 'windicss/helpers'
import { windicssPreset, THEME_DEFAULT, windicssPluginTheme, windicssPluginTypography } from '@soramitsu-ui/theme'

export default defineConfig({
  extract: {
    include: ['src/**/*.{md,vue}', 'src/**/*.spec.cy.{js,ts}'],
  },
  presets: [windicssPreset],
  plugins: [windicssPluginTheme('default', THEME_DEFAULT), windicssPluginTypography()],
})
