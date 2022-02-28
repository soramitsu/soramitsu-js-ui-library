import { CheckboxState } from './types'

export function validateChecked(value: boolean | string): value is CheckboxState {
  return typeof value === 'boolean' || value === 'mixed'
}
