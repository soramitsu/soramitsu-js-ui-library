import Vue from 'vue'

import {
  SApp,
  SAside,
  SBreadcrumb,
  SBreadcrumbItem,
  SButton,
  SButtonGroup,
  SCard,
  SCheckbox,
  SCol,
  SCollapse,
  SCollapseItem,
  SContainer,
  SDialog,
  SDivider,
  SDropdown,
  SDropdownItem,
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
  SScrollSectionItem,
  SScrollSections,
  SSubmenu,
  STable,
  STableColumn,
  STooltip
} from './components'
import { Components } from './types/components'
import { Message, MessageBox, Notification } from './plugins/elementUI'

const elements = [
  { component: SApp, name: Components.SApp },
  { component: SAside, name: Components.SAside },
  { component: SBreadcrumb, name: Components.SBreadcrumb },
  { component: SBreadcrumbItem, name: Components.SBreadcrumbItem },
  { component: SButton, name: Components.SButton },
  { component: SButtonGroup, name: Components.SButtonGroup },
  { component: SCard, name: Components.SCard },
  { component: SCheckbox, name: Components.SCheckbox },
  { component: SCol, name: Components.SCol },
  { component: SCollapse, name: Components.SCollapse },
  { component: SCollapseItem, name: Components.SCollapseItem },
  { component: SContainer, name: Components.SContainer },
  { component: SDialog, name: Components.SDialog },
  { component: SDivider, name: Components.SDivider },
  { component: SDropdown, name: Components.SDropdown },
  { component: SDropdownItem, name: Components.SDropdownItem },
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
  { component: SScrollSectionItem, name: Components.SScrollSectionItem },
  { component: SScrollSections, name: Components.SScrollSections },
  { component: SSubmenu, name: Components.SSubmenu },
  { component: STable, name: Components.STable },
  { component: STableColumn, name: Components.STableColumn },
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
  Message,
  MessageBox,
  Notification,
  SApp,
  SAside,
  SBreadcrumb,
  SBreadcrumbItem,
  SButton,
  SButtonGroup,
  SCard,
  SCheckbox,
  SCol,
  SCollapse,
  SCollapseItem,
  SContainer,
  SDialog,
  SDivider,
  SDropdown,
  SDropdownItem,
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
  SScrollSectionItem,
  SScrollSections,
  SSubmenu,
  STable,
  STableColumn,
  STooltip
}
export default SoramitsuElements
