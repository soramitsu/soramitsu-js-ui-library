import { Status } from '@/types'

export const STATUS_ARG_TYPE = {
  control: 'inline-radio',
  options: [Status.Info, Status.Success, Status.Warning, Status.Error],
} as const
