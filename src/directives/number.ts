import { DirectiveOptions } from 'vue'

import { KeyValues } from '../utils/KeyValues'

const onDigitKeyPress = (e: any) => {
  if (!KeyValues.isDigit(e.key)) {
    e.preventDefault()
  } else {
    return true
  }
}

const onNumberKeyPress = (e: any) => {
  if (!KeyValues.isNumber(e.key) || (!KeyValues.isDigit(e.key) && e.target.value.includes('.'))) {
    e.preventDefault()
  } else {
    return true
  }
}

export const Integer = {
  bind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.addEventListener(
        'keypress',
        onDigitKeyPress
      )
    }
  },
  unbind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.removeEventListener(
        'keypress',
        onDigitKeyPress
      )
    }
  }
} as DirectiveOptions

export const Float = {
  bind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.addEventListener(
        'keypress',
        onNumberKeyPress
      )
    }
  },
  unbind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.removeEventListener(
        'keypress',
        onNumberKeyPress
      )
    }
  }
} as DirectiveOptions
