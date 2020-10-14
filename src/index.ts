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
  SDatePicker,
  SDialog,
  SDivider,
  SDropdown,
  SDropdownItem,
  SFooter,
  SForm,
  SFormItem,
  SHeader,
  SIcon,
  SInput,
  SJsonInput,
  SMain,
  SMenu,
  SMenuItem,
  SMenuItemGroup,
  SOption,
  SOptionGroup,
  SPagination,
  SRadio,
  SRow,
  SScrollSectionItem,
  SScrollSections,
  SSelect,
  SSubmenu,
  SSwitch,
  STab,
  STabs,
  STable,
  STableColumn,
  STooltip
} from './components'
import { Float, Integer } from './directives'
import { Components } from './types/components'
import { Directives } from './types/directives'
import { Loading, Message, MessageBox, Notification } from './plugins/elementUI'

const components = [
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
  { component: SDatePicker, name: Components.SDatePicker },
  { component: SDialog, name: Components.SDialog },
  { component: SDivider, name: Components.SDivider },
  { component: SDropdown, name: Components.SDropdown },
  { component: SDropdownItem, name: Components.SDropdownItem },
  { component: SFooter, name: Components.SFooter },
  { component: SForm, name: Components.SForm },
  { component: SFormItem, name: Components.SFormItem },
  { component: SHeader, name: Components.SHeader },
  { component: SIcon, name: Components.SIcon },
  { component: SInput, name: Components.SInput },
  { component: SJsonInput, name: Components.SJsonInput },
  { component: SMain, name: Components.SMain },
  { component: SMenu, name: Components.SMenu },
  { component: SMenuItem, name: Components.SMenuItem },
  { component: SMenuItemGroup, name: Components.SMenuItemGroup },
  { component: SOption, name: Components.SOption },
  { component: SOptionGroup, name: Components.SOptionGroup },
  { component: SPagination, name: Components.SPagination },
  { component: SRadio, name: Components.SRadio },
  { component: SRow, name: Components.SRow },
  { component: SScrollSectionItem, name: Components.SScrollSectionItem },
  { component: SScrollSections, name: Components.SScrollSections },
  { component: SSelect, name: Components.SSelect },
  { component: SSubmenu, name: Components.SSubmenu },
  { component: SSwitch, name: Components.SSwitch },
  { component: STab, name: Components.STab },
  { component: STabs, name: Components.STabs },
  { component: STable, name: Components.STable },
  { component: STableColumn, name: Components.STableColumn },
  { component: STooltip, name: Components.STooltip }
]

const directives = [
  { directive: Float, name: Directives.Float },
  { directive: Integer, name: Directives.Integer }
]

const SoramitsuElements = {
  install (vue: typeof Vue): void {
    components.forEach(el => vue.component(el.name, el.component))
    directives.forEach(item => vue.directive(item.name, item.directive))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SoramitsuElements, {})
}

export {
  Loading,
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
  SDatePicker,
  SDialog,
  SDivider,
  SDropdown,
  SDropdownItem,
  SFooter,
  SForm,
  SFormItem,
  SHeader,
  SIcon,
  SInput,
  SJsonInput,
  SMain,
  SMenu,
  SMenuItem,
  SMenuItemGroup,
  SPagination,
  SOption,
  SOptionGroup,
  SRadio,
  SRow,
  SScrollSectionItem,
  SScrollSections,
  SSelect,
  SSubmenu,
  SSwitch,
  STab,
  STabs,
  STable,
  STableColumn,
  STooltip
}
export default SoramitsuElements
