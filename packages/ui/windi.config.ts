import { defineConfig } from 'windicss/helpers'
import { preset, THEME_DEFAULT, pluginThemeUtility } from '@soramitsu-ui/theme'

export default defineConfig({
  extract: {
    include: ['**/*.{md,vue}', '.vitepress/**/*.{ts,md,vue}'],
  },
  presets: [preset],
  plugins: [pluginThemeUtility('default', THEME_DEFAULT)],
})
