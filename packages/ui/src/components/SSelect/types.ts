export enum SSelectSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export enum SSelectButtonType {
  Default = 'default',
  Inline = 'inline',
  // Icon = 'icon'
}

export enum SSelectOptionType {
  RadioOrCheckbox = 'rad-or-check',
  Check = 'check',
}

export interface Option<T = any> {
  label: string
  value: T
}
