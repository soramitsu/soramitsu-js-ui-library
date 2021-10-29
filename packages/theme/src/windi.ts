import { ThemePreset, ThemeVars } from './theme'
import { Config } from 'windicss/types/interfaces'
import plugin from 'windicss/plugin'

function v(variableName: ThemeVars): string {
  return `var(${variableName})`
}

function defineSoraTypographyBlockStyle<
  T extends Partial<{
    fontSize: string
    letterSpacing: string
    lineHeight: string
    fontFeatureSettings: string
    fontWeight: string
    fontFamily: string
    fontStyle: string
    textTransform: string
  }>,
>(a: T): T {
  return {
    fontFamily: 'Sora',
    fontWeight: 'normal',
    ...a,
  }
}

function soraTyBlockName<B extends string>(block: B): `.s-ty-${B}` {
  return `.s-ty-${block}`
}

/**
 * Adds typography blocks from Web Design System.
 *
 * @example
 * ```html
 * <div class="s-ty-h2">I am a H2 heading!</div>
 * ```
 *
 * TODO test with jest
 */
export function windicssPluginTypography() {
  return plugin(({ addUtilities }) => {
    const typographyUtilities = {
      [soraTyBlockName('d1')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSize4xl),
        letterSpacing: '-0.02rem',
        lineHeight: '120%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'ss01' on, 'case' on",
        fontWeight: 'bold',
      }),
      [soraTyBlockName('d2')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSize2xl),
        letterSpacing: '-0.04rem',
        lineHeight: '130%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
        fontWeight: 'bold',
      }),

      [soraTyBlockName('h1')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSize3xl),
        letterSpacing: '-0.04rem',
        lineHeight: '120%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('h2')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSize2xl),
        letterSpacing: '-0.04rem',
        lineHeight: '130%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('h3')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeXl),
        letterSpacing: '-0.02rem',
        lineHeight: '130%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('h4')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeLg),
        letterSpacing: '-0.02rem',
        lineHeight: '150%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('h5')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeMd),
        letterSpacing: '0.01rem',
        lineHeight: '150%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
        fontWeight: 'bold',
      }),
      [soraTyBlockName('h6')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeSm),
        lineHeight: '150%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
        fontWeight: 'bold',
      }),
      [soraTyBlockName('h7')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeXs),
        lineHeight: '150%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
        fontWeight: 'bold',
      }),

      [soraTyBlockName('ch1')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeSm),
        letterSpacing: '0.01em',
        lineHeight: '130%',
        textTransform: 'uppercase',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'case' on",
        fontWeight: 'bold',
      }),
      [soraTyBlockName('ch2')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeXs),
        letterSpacing: '0.03em',
        lineHeight: '130%',
        textTransform: 'uppercase',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'case' on",
        fontWeight: 'bold',
      }),
      [soraTyBlockName('ch3')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSize2xs),
        letterSpacing: '0.06em',
        lineHeight: '140%',
        textTransform: 'uppercase',
        fontFeatureSettings: "'case' on",
        fontWeight: 'bold',
      }),

      [soraTyBlockName('p1')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeMd),
        lineHeight: '170%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('p2')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeSm),
        lineHeight: '180%',
        fontWeight: '600',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('p3')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeSm),
        lineHeight: '180%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'case' on",
      }),
      [soraTyBlockName('p4')]: defineSoraTypographyBlockStyle({
        fontSize: v(ThemeVars.FontSizeXs),
        lineHeight: '180%',
        fontFeatureSettings: "'tnum' on, 'lnum' on, 'salt' on, 'ss01' on, 'case' on",
      }),
    }

    addUtilities(typographyUtilities)
  })
}

/**
 * Adds utility to override theme variables in a specified scope
 *
 * @remarks
 *
 * Plugin could be installed like this:
 *
 * ```ts
 * // windi.config.ts
 * import { windicssPluginTheme, ThemeVars } from '@soramitsu-ui/theme'
 *
 * export default {
 *   plugins: [
 *     windicssPluginTheme('my-custom-theme', {
 *       [ThemeVars.BrandSoramitsuRed]: "#ff0000"
 *     })
 *   ]
 * }
 * ```
 *
 * Usage of the appended utility:
 *
 * ```html
 * <div class="s-theme-my-custom-theme">
 *   Custom theme is applied here
 * </div>
 * ```
 *
 * @param themeName Affects utility name, i.e. `s-theme-${themeName}`
 * @param theme Subset of theme variables
 */
export function windicssPluginTheme(themeName: string, theme: Partial<ThemePreset>) {
  return plugin(({ addUtilities }) => {
    addUtilities({
      [`.s-theme-${themeName}`]: {
        ...theme,
      },
    })
  })
}

/**
 * Preset with colors, font sizes, shadows etc (WIP)
 */
export const windicssPreset: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          'soramitsu-red': v(ThemeVars.BrandSoramitsuRed),
          'pms-black': v(ThemeVars.BrandPMSBlack),
          'ultra-black': v(ThemeVars.BrandUltraBlack),
          white: v(ThemeVars.BrandWhite),
          'polkaswap-pink': v(ThemeVars.BrandPolkaswapPink),
        },
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
        '3xl': v(ThemeVars.FontSize3xl),
        '2xl': v(ThemeVars.FontSize2xl),
        xl: v(ThemeVars.FontSizeXl),
        lg: v(ThemeVars.FontSizeLg),
        md: v(ThemeVars.FontSizeMd),
        sm: v(ThemeVars.FontSizeSm),
        xs: v(ThemeVars.FontSizeXs),
        '2xs': v(ThemeVars.FontSize2xs),
      },

      fontFamily: {
        sora: 'Sora',
      },

      // TODO shadows etc
    },
  },
}
