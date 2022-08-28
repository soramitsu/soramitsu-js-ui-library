import { DirectiveOptions } from 'vue'

import KeyValues from '../utils/KeyValues'

const onEnterKeyPress = (e: any) => {
  if (KeyValues.isEnter(e.key)) {
    e.preventDefault()
    e.target.click()
  }
}

export const Button = {
  bind (el, binding, vnode) {
    if (binding.value || typeof binding.value === 'undefined') {
      const button = el as HTMLDivElement
      button.setAttribute('role', 'button')
      button.addEventListener(
        'keypress',
        onEnterKeyPress
      )
    }
  },
  unbind (el, binding, vnode) {
    if (binding.value || typeof binding.value === 'undefined') {
      const button = el as HTMLDivElement
      button.removeAttribute('role')
      button.removeEventListener(
        'keypress',
        onEnterKeyPress
      )
    }
  }
} as DirectiveOptions
