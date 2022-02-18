import { InjectionKey, Ref } from 'vue'
import { forceInject } from '@/util'

export interface RadioGroupApi {
  /**
   * Registers a radio button within the radio group.
   *
   * It is automatically unregistered on scope dispose.
   */
  registerRadio: (params: RegisterRadioParams) => RadioGroupRegisteredItemApi
}

export interface RegisterRadioParams {
  value: Ref<any>
  elem: Ref<null | HTMLElement>
}

export interface RadioGroupRegisteredItemApi {
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

  /**
   * Tells to the radio group that this item was checked
   */
  check: () => void
}

export const RADIO_GROUP_API_KEY: InjectionKey<RadioGroupApi> = Symbol('RadioGroupApi')

export function useRadioGroupApi(): RadioGroupApi {
  return forceInject(RADIO_GROUP_API_KEY)
}
