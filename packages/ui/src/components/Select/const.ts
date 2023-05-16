import { SelectSize } from './types'

export const RADIO_CHECKBOX_SIZE = {
  [SelectSize.Xl]: 'xl',
  [SelectSize.Lg]: 'lg',
  [SelectSize.Md]: 'lg',
  [SelectSize.Sm]: 'md',
} as const

export const CHECK_ICON_SIZE = {
  [SelectSize.Xl]: 24,
  [SelectSize.Lg]: 16,
  [SelectSize.Md]: 16,
  [SelectSize.Sm]: 16,
} as const
