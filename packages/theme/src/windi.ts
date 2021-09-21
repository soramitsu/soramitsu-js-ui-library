import { ThemePreset, ThemeVars } from './core'
import { Config } from 'windicss/types/interfaces'
import plugin from 'windicss/plugin'

function v(variableName: ThemeVars): string {
  return `var(${variableName})`
}

export function pluginThemeUtility(themeName: string, theme: ThemePreset) {
  return plugin(({ addUtilities }) => {
    addUtilities({
      [`.theme-${themeName}`]: {
        ...theme,
      },
    })
  })
}

export const preset: Config = {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: v(ThemeVars.ColorThemeAccent),
          hover: v(ThemeVars.ColorThemeAccentHover),
          pressed: v(ThemeVars.ColorThemeAccentPressed),
          focused: v(ThemeVars.ColorThemeAccentFocused),
        },
        secondary: {
          DEFAULT: v(ThemeVars.ColorThemeSecondary),
          hover: v(ThemeVars.ColorThemeSecondaryHover),
          pressed: v(ThemeVars.ColorThemeSecondaryPressed),
          focused: v(ThemeVars.ColorThemeSecondaryFocused),
        },
        base: {
          content: {
            primary: v(ThemeVars.ColorBaseContentPrimary),
            secondary: v(ThemeVars.ColorBaseContentSecondary),
            tertiary: v(ThemeVars.ColorBaseContentTertiary),
            quaternary: v(ThemeVars.ColorBaseContentQuaternary),
          },
          background: {
            DEFAULT: v(ThemeVars.ColorBaseBackground),
            hover: v(ThemeVars.ColorBaseBackgroundHover),
            dark: v(ThemeVars.ColorBaseDarkBackground),
          },
          border: {
            primary: v(ThemeVars.ColorBaseBorderPrimary),
            secondary: v(ThemeVars.ColorBaseBorderSecondary),
          },
          disabled: v(ThemeVars.ColorBaseDisabled),
          on: {
            disabled: v(ThemeVars.ColorBaseOnDisabled),
            accent: v(ThemeVars.ColorBaseOnAccent),
          },
        },
        utility: {
          body: v(ThemeVars.ColorUtilityBody),
          surface: v(ThemeVars.ColorUtilitySurface),
          overlay: v(ThemeVars.ColorUtilityOverlay),
        },
        status: {
          success: v(ThemeVars.ColorStatusSuccess),
          warning: v(ThemeVars.ColorStatusWarning),
          error: v(ThemeVars.ColorStatusError),
          background: {
            success: v(ThemeVars.ColorStatusSuccessBackground),
            warning: v(ThemeVars.ColorStatusWarningBackground),
            error: v(ThemeVars.ColorStatusErrorBackground),
          },
        },
      },

      fontSize: {
        d1: v(ThemeVars.FontSizeD1),
        d2: v(ThemeVars.FontSizeD2),

        h1: v(ThemeVars.FontSizeH1),
        h2: v(ThemeVars.FontSizeH2),
        h3: v(ThemeVars.FontSizeH3),
        h4: v(ThemeVars.FontSizeH4),
        h5: v(ThemeVars.FontSizeH5),
        h6: v(ThemeVars.FontSizeH6),
        h7: v(ThemeVars.FontSizeH7),

        ch1: v(ThemeVars.FontSizeCH1),
        ch2: v(ThemeVars.FontSizeCH2),
        ch3: v(ThemeVars.FontSizeCH3),

        p1: v(ThemeVars.FontSizeP1),
        p2: v(ThemeVars.FontSizeP2),
        p3: v(ThemeVars.FontSizeP3),
        p4: v(ThemeVars.FontSizeP4),

        singleline: v(ThemeVars.FontSizeSingleline),
      },

      // TODO
    },
  },
}
