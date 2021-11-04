import { SSelectSize } from './types'

export const SelectSizePxMap: { [K in SSelectSize]: number } = {
  [SSelectSize.Sm]: 24,
  [SSelectSize.Md]: 32,
  [SSelectSize.Lg]: 40,
  [SSelectSize.Xl]: 56,
}
