import { InjectionKey } from 'vue'
import { forceInject } from '@/util'

export interface RadioGroupApi {
  /**
   * Registers a radio button within the radio group.
   *
   * It is automatically unregistered on scope dispose.
   */
  registerRadio: () => RadioGroupRegisteredItemApi
}

export interface RadioGroupRegisteredItemApi {
  /**
   * Sets a value of the radio.
   */
  setValue: (value: any) => void

  /**
   * Sets an element of the radio. It is used for keyboard navigation and to determine order between radio buttons
   */
  setEl: (el: HTMLElement) => void

  /**
   * Reactive radio state. Can be used for styling and `aria-checked` attr.
   */
  isChecked: boolean

  /**
   *
   * "Tabbable" means that radio should have `tabindex="0"`.
   * Radio button is tabbable in 2 cases:
   *
   * - When it is checked
   * - When nothing in the radio group is checked and it is the first button in the radio group
   */
  isTabbable: boolean

  check: () => void
}

export const RADIO_GROUP_API_KEY: InjectionKey<RadioGroupApi> = Symbol('RadioGroupApi')

export function useRadioGroupApi(): RadioGroupApi {
  return forceInject(RADIO_GROUP_API_KEY)
}
