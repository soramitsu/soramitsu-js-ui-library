/**
 * General status enum. Used, for example, in notifications and alerts
 */
export const Status = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const

export type Status = typeof Status[keyof typeof Status]
