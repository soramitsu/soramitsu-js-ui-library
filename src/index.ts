import Vue from 'vue'

import {
  SApp,
  SAside,
  SButton,
  SButtonGroup,
  SContainer,
  SFooter,
  SHeader,
  SInput,
  SJsonInput,
  SMain,
  STooltip
} from './components'
import { Components } from './types/components'

const elements = [
  { component: SApp, name: Components.SApp },
  { component: SAside, name: Components.SAside },
  { component: SButton, name: Components.SButton },
  { component: SButtonGroup, name: Components.SButtonGroup },
  { component: SContainer, name: Components.SContainer },
  { component: SFooter, name: Components.SFooter },
  { component: SHeader, name: Components.SHeader },
  { component: SInput, name: Components.SInput },
  { component: SJsonInput, name: Components.SJsonInput },
  { component: SMain, name: Components.SMain },
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
  SApp,
  SAside,
  SButton,
  SButtonGroup,
  SContainer,
  SFooter,
  SHeader,
  SInput,
  SJsonInput,
  SMain,
  STooltip
}
export default SoramitsuElements
