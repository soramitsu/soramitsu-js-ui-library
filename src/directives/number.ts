import { DirectiveOptions } from 'vue'

import KeyValues from '../utils/KeyValues'

const onDigitKeyDown = (e: any) => {
  if (!KeyValues.isDigit(e.key)) {
    e.preventDefault()
  } else {
    return true
  }
}

const onNumberKeyDown = (e: any) => {
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
        'keydown',
        onDigitKeyDown
      )
    }
  },
  unbind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.removeEventListener(
        'keydown',
        onDigitKeyDown
      )
    }
  }
} as DirectiveOptions

export const Float = {
  bind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.addEventListener(
        'keydown',
        onNumberKeyDown
      )
    }
  },
  unbind (el, binding, vnode) {
    const input = el.querySelector('input[type="text"]') as HTMLInputElement
    if (input) {
      input.removeEventListener(
        'keydown',
        onNumberKeyDown
      )
    }
  }
} as DirectiveOptions
