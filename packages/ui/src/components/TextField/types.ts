export interface ValidationEntity {
  rule: boolean
  message: string
}

export interface ValidationsList {
  validations: (value: string) => ValidationEntity[]
  title: string
  errorOn?: boolean
  successOn?: boolean
  showOnFocusOnly?: boolean
}
