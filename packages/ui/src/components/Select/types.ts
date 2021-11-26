export enum SelectSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export enum SelectButtonType {
  Default = 'default',
  Inline = 'inline',
  // TODO append in future
  // Icon = 'icon'
}

export enum SelectOptionType {
  RadioOrCheckbox = 'rad-or-check',
  Check = 'check',
}

export interface SelectOption<T = any> {
  label: string
  value: T
}
