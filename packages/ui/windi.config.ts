import { defineConfig } from 'windicss/helpers'
import { presetToWindicssPreset, PRESET_DEFAULT } from '@soramitsu-ui/theme'

export default defineConfig({
    presets: [presetToWindicssPreset(PRESET_DEFAULT)],
})
