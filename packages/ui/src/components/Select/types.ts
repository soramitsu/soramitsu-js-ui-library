import type { PrimitiveKey } from '@/types'

export const SelectSize = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
} as const

export type SelectSize = (typeof SelectSize)[keyof typeof SelectSize]

export const SelectButtonStyle = {
  Default: 'default',
  Inline: 'inline',
  // TODO append in future
  // Icon = 'icon'
} as const

export type SelectButtonStyle = (typeof SelectButtonStyle)[keyof typeof SelectButtonStyle]

/**
 * How `SSelectOption` should be rendered in single-model
 */
export const SelectOptionStyle = {
  RadioAndCheckbox: 'radio-checkbox',
  Check: 'check',
} as const

export type SelectOptionStyle = (typeof SelectOptionStyle)[keyof typeof SelectOptionStyle]

export interface ParsedOptionGroup<T> {
  kind: 'group'
  key: PrimitiveKey
  label: string
  options: T[]
}

export interface ParsedOption<T> {
  kind: 'item'
  raw: T
}

export type ParsedOptions<T> = (ParsedOption<T> | ParsedOptionGroup<T>)[]

export interface OptionsGroup<T> {
  label: string
  key: PrimitiveKey
  options: T[]
}

export interface OptionDataGetters<O, V> {
  key: (option: O) => PrimitiveKey
  value: (option: O) => V
  label: (option: O) => string
  disabled?: null | ((option: O) => boolean)
  asGroup?: null | ((option: O) => null | OptionsGroup<O>)
}
