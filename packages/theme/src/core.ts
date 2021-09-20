/**
 * This enum defines each CSS custom property in Soramitsu's UI theme configuration
 *
 * TODO update this set with a designer
 * TODO move line-height, letter spacing and font features to typography plugin?
 *
 * https://www.figma.com/file/5wkmuDVIPBre6bYs2ulTJR/Web-Design-System-2.0?node-id=107%3A1250
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
    ColorStatusSuccessBackground = '--s-color-status-success-background',
    ColorStatusWarningBackground = '--s-color-status-warning-background',
    ColorStatusErrorBackground = '--s-color-status-error-background',

    /**
     * Display
     */
    FontSizeD1 = '--s-font-size-d-1',
    FontSizeD2 = '--s-font-size-d-2',

    /**
     * Heading
     */
    FontSizeH1 = '--s-font-size-h-1',
    FontSizeH2 = '--s-font-size-h-2',
    FontSizeH3 = '--s-font-size-h-3',
    FontSizeH4 = '--s-font-size-h-4',
    FontSizeH5 = '--s-font-size-h-5',
    FontSizeH6 = '--s-font-size-h-6',
    FontSizeH7 = '--s-font-size-h-7',

    /**
     * Caps Heading
     */
    FontSizeCH1 = '--s-font-size-ch-1',
    FontSizeCH2 = '--s-font-size-ch-2',
    FontSizeCH3 = '--s-font-size-ch-3',

    /**
     * Paragraph
     */
    FontSizeP1 = '--s-font-size-p-1',
    FontSizeP2 = '--s-font-size-p-2',
    FontSizeP3 = '--s-font-size-p-3',
    FontSizeP4 = '--s-font-size-p-4',

    FontSizeSingleline = '--s-font-size-singleline',

    // FontSizeExtraMini = '--s-font-size-extra-mini',
    // FontSizeMini = '--s-font-size-mini',
    // FontSizeExtraSmall = '--s-font-size-extra-small',
    // FontSizeSmall = '--s-font-size-small',
    // FontSizeMedium = '--s-font-size-medium',
    // FontSizeBig = '--s-font-size-big',
    // FontSizeLarge = '--s-font-size-large',
    // IconFontSizeMini = '--s-icon-font-size-mini',
    // IconFontSizeSmall = '--s-icon-font-size-small',
    // IconFontSizeMedium = '--s-icon-font-size-medium',
    // IconFontSizeBig = '--s-icon-font-size-big',
    // Heading0FontSize = '--s-heading0-font-size',
    // Heading1FontSize = '--s-heading1-font-size',
    // Heading2FontSize = '--s-heading2-font-size',
    // Heading3FontSize = '--s-heading3-font-size',
    // Heading4FontSize = '--s-heading4-font-size',
    // Heading5FontSize = '--s-heading5-font-size',
    // Heading6FontSize = '--s-heading6-font-size',
    // Heading7FontSize = '--s-heading7-font-size',
    // Heading8FontSize = '--s-heading8-font-size',

    // ???
    LineHeightReset = '--s-line-height-reset',
    LineHeightMini = '--s-line-height-mini',
    LineHeightExtraSmall = '--s-line-height-extra-small',
    LineHeightSmall = '--s-line-height-small',
    LineHeightBase = '--s-line-height-base',
    LineHeightMedium = '--s-line-height-medium',
    LineHeightBig = '--s-line-height-big',
    LetterSpacingMini = '--s-letter-spacing-mini',
    LetterSpacingSmall = '--s-letter-spacing-small',
    LetterSpacingMedium = '--s-letter-spacing-medium',
    LetterSpacingBig = '--s-letter-spacing-big',
    LetterSpacingLarge = '--s-letter-spacing-large',
    LetterSpacingExtraLarge = '--s-letter-spacing-extra-large',
    FontFeatureSettingsCommon = '--s-font-feature-settings-common',
    FontFeatureSettingsHeading = '--s-font-feature-settings-heading',
    FontFeatureSettingsCapsHeading = '--s-font-feature-settings-caps-heading',
    FontFeatureSettingsCaps = '--s-font-feature-settings-caps',
    FontFeatureSettingsSingleline = '--s-font-feature-settings-singleline',
    FontFeatureSettingsCardTitle = '--s-font-feature-settings-card-title',
    FontFeatureSettingsInput = '--s-font-feature-settings-input',
    FontFeatureSettingsButton = '--s-font-feature-settings-button',

    // ???
    SizeMini = '--s-size-mini',
    SizeSmall = '--s-size-small',
    SizeMedium = '--s-size-medium',
    SizeBig = '--s-size-big',

    // ???
    BasicSpacing = '--s-basic-spacing',

    // Is it necessary?
    BorderRadiusMini = '--s-border-radius-mini',
    BorderRadiusSmall = '--s-border-radius-small',
    BorderRadiusMedium = '--s-border-radius-medium',
    BorderRadiusBig = '--s-border-radius-big',

    ShadowSurface = '--s-shadow-surface',
    ShadowTooltip = '--s-shadow-tooltip',
    ShadowTokenIcon = '--s-shadow-token-icon',
    ShadowTab = '--s-shadow-tab',
    ShadowDropdown = '--s-shadow-dropdown',
    ShadowMobileTapBar = '--s-shadow-mobile-tap-bar',
    ShadowMobileSideMenu = '--s-shadow-mobile-side-menu',

    // ???
    ShadowColorDark = '--s-shadow-color-dark',
    ShadowColorDarkLight = '--s-shadow-color-dark-light',
    ShadowColorLight = '--s-shadow-color-light',
    ShadowColorLightDark = '--s-shadow-color-light-dark',
    ShadowElement = '--s-shadow-element',
    ShadowElementPressed = '--s-shadow-element-pressed',
}

export type ThemePreset = { [K in ThemeVars]: string }

export function definePreset(preset: ThemePreset): ThemePreset {
    return preset
}
