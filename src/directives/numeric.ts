import { DirectiveOptions } from 'vue'

import { KeyValues } from '../utils/KeyValues'

const onKeyPress = (e: any) => {
  if (!KeyValues.isDigit(e.key)) {
    e.preventDefault()
  } else {
    return true
  }
}

export const Numeric = {
  bind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.addEventListener(
        'keypress',
        onKeyPress
      )
    }
  },
  unbind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.removeEventListener(
        'keypress',
        onKeyPress
      )
    }
  }
} as DirectiveOptions
