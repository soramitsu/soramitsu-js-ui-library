import { defineConfig } from 'windicss/helpers'
import { windicssPreset, THEME_DEFAULT, windicssPluginThemeUtility } from '@soramitsu-ui/theme'

export default defineConfig({
  preflight: false,
  extract: {
    include: ['**/*.{md,vue}', '.vitepress/**/*.{ts,md,vue}'],
  },
  presets: [windicssPreset],
  plugins: [windicssPluginThemeUtility('default', THEME_DEFAULT)],
})
