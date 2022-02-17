export const RADIO_BUTTON_SIZE = ['md', 'lg', 'xl'] as const

export type RadioButtonSize = typeof RADIO_BUTTON_SIZE extends ReadonlyArray<infer T> ? T : never
