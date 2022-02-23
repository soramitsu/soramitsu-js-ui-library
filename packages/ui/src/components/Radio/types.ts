export const RADIO_BUTTON_SIZE = ['md', 'lg', 'xl'] as const

export type RadioButtonSize = typeof RADIO_BUTTON_SIZE extends ReadonlyArray<infer T> ? T : never

export const RADIO_BUTTON_TYPE = ['default', 'bordered', 'bordered-with-description'] as const

export type RadioButtonType = typeof RADIO_BUTTON_TYPE extends ReadonlyArray<infer T> ? T : never
