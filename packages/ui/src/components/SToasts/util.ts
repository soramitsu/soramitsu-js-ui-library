import { ToastDisplayPlacement } from './types'
import { Prop, PropType } from 'vue'

export const PLACEMENTS: ToastDisplayPlacement[] = ['top-left', 'top-right', 'bottom-right', 'bottom-left']

export const PLACEMENTS_SET = new Set(PLACEMENTS)

export function validatePlacement(value: unknown): value is ToastDisplayPlacement {
  return PLACEMENTS_SET.has(value as any)
}

export const TOAST_DISPLAY_PLACEMENT_PROP: Prop<ToastDisplayPlacement> = {
  type: String as PropType<ToastDisplayPlacement>,
  required: true,
  validator: validatePlacement,
}
