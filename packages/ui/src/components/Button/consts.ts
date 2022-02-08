export const BUTTON_TYPE_VALUES = ['primary', 'secondary', 'outline', 'action'] as const
export const BUTTON_SIZE_VALUES = ['mini', 'small', 'medium', 'big'] as const
export const BUTTON_ICON_POSITION_VALUES = ['left', 'right'] as const

export const SPINNER_SIZE: Record<typeof BUTTON_SIZE_VALUES[number], string> = {
  mini: '12',
  small: '18',
  medium: '24',
  big: '24',
}

export const SPINNER_WIDTH: Record<typeof BUTTON_SIZE_VALUES[number], string> = {
  mini: '3',
  small: '4',
  medium: '4',
  big: '4',
}

export const FONT_SIZE: Record<typeof BUTTON_SIZE_VALUES[number], string> = {
  mini: 'sora-tpg-p4',
  small: 'sora-tpg-h7',
  medium: 'sora-tpg-h6',
  big: 'sora-tpg-h5',
}
