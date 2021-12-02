/**
 * This enum defines each CSS custom property in Soramitsu's UI theme configuration.
 *
 * @remarks
 *
 * [Source](https://www.figma.com/file/5wkmuDVIPBre6bYs2ulTJR/Web-Design-System-2.0?node-id=107%3A1250)
 */
export enum ThemeVars {
  BrandSoramitsuRed = '--s-brand-soramitsu-red',
  BrandPMSBlack = '--s-brand-pms-black',
  BrandUltraBlack = '--s-brand-ultra-black',
  BrandWhite = '--s-brand-white',
  BrandPolkaswapPink = '--s-brand-polkaswap-pink',

  /**
   * Primary buttons, links
   */
  ColorThemeAccent = '--s-color-theme-accent',
  /**
   * Primary button hover
   */
  ColorThemeAccentHover = '--s-color-theme-accent-hover',
  /**
   * Primary button pressed
   */
  ColorThemeAccentPressed = '--s-color-theme-accent-pressed',
  /**
   * Primary button focused
   */
  ColorThemeAccentFocused = '--s-color-theme-accent-focused',

  ColorThemeSecondary = '--s-color-theme-secondary',
  ColorThemeSecondaryHover = '--s-color-theme-secondary-hover',
  ColorThemeSecondaryPressed = '--s-color-theme-secondary-pressed',
  ColorThemeSecondaryFocused = '--s-color-theme-secondary-focused',

  ColorBaseContentPrimary = '--s-color-base-content-primary',
  ColorBaseContentSecondary = '--s-color-base-content-secondary',
  ColorBaseContentTertiary = '--s-color-base-content-tertiary',
  ColorBaseContentQuaternary = '--s-color-base-content-quaternary',
  ColorBaseBackground = '--s-color-base-background',
  ColorBaseDarkBackground = '--s-color-base-dark-background',
  ColorBaseBorderPrimary = '--s-color-base-border-primary',
  ColorBaseBorderSecondary = '--s-color-base-border-secondary',
  ColorBaseBackgroundHover = '--s-color-base-background-hover',
  ColorBaseDisabled = '--s-color-base-disabled',
  ColorBaseOnDisabled = '--s-color-base-on-disabled',
  ColorBaseOnAccent = '--s-color-base-on-accent',

  ColorUtilityBody = '--s-color-utility-body',
  ColorUtilitySurface = '--s-color-utility-surface',
  ColorUtilityOverlay = '--s-color-utility-overlay',

  ColorStatusSuccess = '--s-color-status-success',
  ColorStatusWarning = '--s-color-status-warning',
  ColorStatusError = '--s-color-status-error',
  ColorStatusInfo = '--s-color-status-info',
  ColorStatusSuccessBackground = '--s-color-status-success-background',
  ColorStatusWarningBackground = '--s-color-status-warning-background',
  ColorStatusErrorBackground = '--s-color-status-error-background',
  ColorStatusInfoBackground = '--s-color-status-info-background',

  FontSize2xs = '--s-font-size-2xs',
  FontSizeXs = '--s-font-size-xs',
  FontSizeSm = '--s-font-size-sm',
  FontSizeMd = '--s-font-size-md',
  FontSizeLg = '--s-font-size-lg',
  FontSizeXl = '--s-font-size-xl',
  FontSize2xl = '--s-font-size-2xl',
  FontSize3xl = '--s-font-size-3xl',
  FontSize4xl = '--s-font-size-4xl',

  // // ???
  // SizeMini = '--s-size-mini',
  // SizeSmall = '--s-size-small',
  // SizeMedium = '--s-size-medium',
  // SizeBig = '--s-size-big',

  ShadowSurface = '--s-shadow-surface',
  ShadowTooltip = '--s-shadow-tooltip',
  ShadowTokenIcon = '--s-shadow-token-icon',
  ShadowTab = '--s-shadow-tab',
  ShadowDropdown = '--s-shadow-dropdown',
  ShadowMobileTapBar = '--s-shadow-mobile-tap-bar',
  ShadowMobileSideMenu = '--s-shadow-mobile-side-menu',

  // // ???
  // ShadowColorDark = '--s-shadow-color-dark',
  // ShadowColorDarkLight = '--s-shadow-color-dark-light',
  // ShadowColorLight = '--s-shadow-color-light',
  // ShadowColorLightDark = '--s-shadow-color-light-dark',
  // ShadowElement = '--s-shadow-element',
  // ShadowElementPressed = '--s-shadow-element-pressed',
}

export type ThemePreset = { [K in ThemeVars]: string }

export function defineThemePreset(preset: ThemePreset): ThemePreset {
  return preset
}

export function definePartialThemePreset(preset: Partial<ThemePreset>): Partial<ThemePreset> {
  return preset
}
