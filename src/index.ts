import Vue from 'vue'

import {
  SAside,
  SButton,
  SButtonGroup,
  SInput,
  SJsonInput,
  STooltip
} from './components'
import { Components } from './types/components'

const elements = [
  { component: SAside, name: Components.SAside },
  { component: SButton, name: Components.SButton },
  { component: SButtonGroup, name: Components.SButtonGroup },
  { component: SInput, name: Components.SInput },
  { component: SJsonInput, name: Components.SJsonInput },
  { component: STooltip, name: Components.STooltip }
]

const SoramitsuElements = {
  install (vue: typeof Vue): void {
    elements.forEach(el => vue.component(el.name, el.component))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SoramitsuElements, {})
}

export {
  SAside,
  SButton,
  SButtonGroup,
  SInput,
  SJsonInput,
  STooltip
}
export default SoramitsuElements
