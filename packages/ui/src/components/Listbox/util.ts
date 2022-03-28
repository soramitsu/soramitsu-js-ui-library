import { Ref } from 'vue'

interface ListboxNavigation {
  up: () => void
  down: () => void
  home: () => void
  end: () => void
}

/**
 * Implements recommended selection & navigation model
 */
interface ListboxKeyboardControls {
  up: (shift?: boolean) => void
  down: (shift?: boolean) => void
  left: (shift?: boolean) => void
  right: (shift?: boolean) => void
  home: (controlShift?: boolean) => void
  end: (controlShift?: boolean) => void
  ctrlA: () => void
}

interface UseListboxParams {
  model: any

  multiple: boolean

  /**
   * @default 'vertical'
   */
  orientation?: ListboxOrientation

  /**
   * https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus
   * @default true
   */
  selectionFollowsFocus?: boolean

  /**
   * @default 'li[role=option]'
   */
  optionSelector?: string

  /**
   * For virtual options list
   */
  virtual?: {
    startIndex: number
    totalCount: number
  }

  // TODO
  // typeahead?: boolean
}

type ListboxOrientation = 'vertical' | 'horizontal'

interface UseListboxReturn {
  kbd: ListboxKeyboardControls

  /**
   * role=listbox should be set separately
   */
  listboxProps: {
    ref: any
    onFocus: () => void
    onBlur: () => void
    tabindex: string
    ariaActivedescendant: string | null
    ariaMultiselectable: 'true' | null
    ariaOrientation: string | null
  }

  // options
  registerOption: (params: ListboxRegisterOptionParams) => ListboxRegisterOptionReturn
}

interface ListboxRegisterOptionParams {
  // elRef: Element
  // disabledRef: boolean
  valueRef: any
  idRef: string

  // todo: for typeahead
  // textRef: string
}

interface ListboxRegisterOptionReturn {
  /**
   * role=option should be set separately
   */
  optionProps: {
    ariaSelected: 'true' | 'false' | null
    ariaSetsize: null | string
    ariaPosinset: null | string
  }
  posInSet: number
  selected: Ref<boolean>
}

export function useListbox() {}
