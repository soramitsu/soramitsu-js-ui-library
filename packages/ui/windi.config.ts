import { defineConfig } from 'windicss/helpers'
import { windicssPreset, THEME_DEFAULT, windicssPluginTheme, windicssPluginTypography } from '@soramitsu-ui/theme'

export default defineConfig({
  extract: {
    include: ['**/*.{md,vue,tsx}', '.vitepress/**/*.{ts,md,vue}'],
  },
  presets: [windicssPreset],
  plugins: [windicssPluginTheme('default', THEME_DEFAULT), windicssPluginTypography()],
})
