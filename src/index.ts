import Vue from 'vue'

import {
  SApp,
  SAside,
  SButton,
  SButtonGroup,
  SCol,
  SContainer,
  SFooter,
  SForm,
  SFormItem,
  SHeader,
  SInput,
  SJsonInput,
  SMain,
  SMenu,
  SMenuItem,
  SMenuItemGroup,
  SRow,
  SSubmenu,
  STooltip
} from './components'
import { Components } from './types/components'

const elements = [
  { component: SApp, name: Components.SApp },
  { component: SAside, name: Components.SAside },
  { component: SButton, name: Components.SButton },
  { component: SButtonGroup, name: Components.SButtonGroup },
  { component: SCol, name: Components.SCol },
  { component: SContainer, name: Components.SContainer },
  { component: SFooter, name: Components.SFooter },
  { component: SForm, name: Components.SForm },
  { component: SFormItem, name: Components.SFormItem },
  { component: SHeader, name: Components.SHeader },
  { component: SInput, name: Components.SInput },
  { component: SJsonInput, name: Components.SJsonInput },
  { component: SMain, name: Components.SMain },
  { component: SMenu, name: Components.SMenu },
  { component: SMenuItem, name: Components.SMenuItem },
  { component: SMenuItemGroup, name: Components.SMenuItemGroup },
  { component: SRow, name: Components.SRow },
  { component: SSubmenu, name: Components.SSubmenu },
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
  SCol,
  SContainer,
  SFooter,
  SForm,
  SFormItem,
  SHeader,
  SInput,
  SJsonInput,
  SMain,
  SMenu,
  SMenuItem,
  SMenuItemGroup,
  SRow,
  SSubmenu,
  STooltip
}
export default SoramitsuElements
