import { ThemePreset, ThemeVars } from './core'
import { Config } from 'windicss/types/interfaces'

export function presetToWindicssPreset(preset: ThemePreset): Config {
    function v(variableName: ThemeVars): string {
        return `var(${preset[variableName]})`
    }
    return {
        theme: {
            colors: {
                accent: {
                    DEFAULT: v(ThemeVars.ColorThemeAccent),
                    hover: v(ThemeVars.ColorThemeAccentHover),
                    pressed: v(ThemeVars.ColorThemeAccentPressed),
                    focused: v(ThemeVars.ColorThemeAccentFocused),
                },
                secondary: {
                    // ...
                },
                // TODO
            },
        },
    }
}
