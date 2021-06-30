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
  SDesignSystemProvider,
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
  SFloatInput,
  SJsonInput,
  SMain,
  SMenu,
  SMenuItem,
  SMenuItemGroup,
  SOption,
  SOptionGroup,
  SPagination,
  SRadio,
  SRadioGroup,
  SRow,
  SScrollSectionItem,
  SScrollSections,
  SSelect,
  SSlider,
  SSubmenu,
  SSwitch,
  STab,
  STabs,
  STable,
  SHierarchicalTable,
  STableColumn,
  STooltip
} from './components'

import { Float, Integer } from './directives'
import { Components } from './types/components'
import { Directives } from './types/directives'
import { modules, Modules } from './store'
import { setTheme, setDesignSystem } from './utils'
import { DesignSystemTypes } from './utils/DesignSystem'
import { Themes } from './utils/Theme'
import { Loading, Message, MessageBox, Notification } from './plugins/elementUI'
import { SDialogMixin } from './mixins'

const libraryComponentsMap = {
  [Components.SApp]: SApp,
  [Components.SAside]: SAside,
  [Components.SBreadcrumb]: SBreadcrumb,
  [Components.SBreadcrumbItem]: SBreadcrumbItem,
  [Components.SButton]: SButton,
  [Components.SButtonGroup]: SButtonGroup,
  [Components.SCard]: SCard,
  [Components.SCheckbox]: SCheckbox,
  [Components.SCol]: SCol,
  [Components.SCollapse]: SCollapse,
  [Components.SCollapseItem]: SCollapseItem,
  [Components.SContainer]: SContainer,
  [Components.SDatePicker]: SDatePicker,
  [Components.SDesignSystemProvider]: SDesignSystemProvider,
  [Components.SDialog]: SDialog,
  [Components.SDivider]: SDivider,
  [Components.SDropdown]: SDropdown,
  [Components.SDropdownItem]: SDropdownItem,
  [Components.SFooter]: SFooter,
  [Components.SForm]: SForm,
  [Components.SFormItem]: SFormItem,
  [Components.SHeader]: SHeader,
  [Components.SIcon]: SIcon,
  [Components.SFloatInput]: SFloatInput,
  // [Components.SJsonInput]: SJsonInput, // dont register global, just for test
  [Components.SMain]: SMain,
  [Components.SMenu]: SMenu,
  [Components.SMenuItem]: SMenuItem,
  [Components.SMenuItemGroup]: SMenuItemGroup,
  [Components.SOption]: SOption,
  [Components.SOptionGroup]: SOptionGroup,
  [Components.SPagination]: SPagination,
  [Components.SRadio]: SRadio,
  [Components.SRadioGroup]: SRadioGroup,
  [Components.SRow]: SRow,
  [Components.SScrollSectionItem]: SScrollSectionItem,
  [Components.SScrollSections]: SScrollSections,
  [Components.SSlider]: SSlider,
  [Components.SSubmenu]: SSubmenu,
  [Components.SSwitch]: SSwitch,
  [Components.STab]: STab,
  [Components.STabs]: STabs,
  [Components.STable]: STable,
  [Components.SHierarchicalTable]: SHierarchicalTable,
  [Components.STableColumn]: STableColumn,
  [Components.STooltip]: STooltip
}

const libraryDirectivesMap = {
  [Directives.Float]: Float,
  [Directives.Integer]: Integer
}

const SoramitsuElements = {
  install (vue: typeof Vue, options?: any): void {
    // TODO: maybe we'll need error message about storage here
    if (options && options.store) {
      Object.values(Modules).forEach(molude => {
        options.store.registerModule(molude, modules[molude])
      })
    }

    const components: Array<string> = options && options.components ? options.components : Object.values(Components)
    const directives: Array<string> = options && options.directives ? options.directives : Object.values(Directives)

    components.forEach(item => vue.component(item, libraryComponentsMap[item]))
    directives.forEach(item => vue.component(item, libraryDirectivesMap[item]))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SoramitsuElements, {})
}

export {
  setTheme,
  Themes,
  setDesignSystem,
  DesignSystemTypes,
  Components,
  Directives,
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
  SDesignSystemProvider,
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
  SFloatInput,
  SJsonInput,
  SMain,
  SMenu,
  SMenuItem,
  SMenuItemGroup,
  SPagination,
  SOption,
  SOptionGroup,
  SRadio,
  SRadioGroup,
  SRow,
  SScrollSectionItem,
  SScrollSections,
  SSelect,
  SSlider,
  SSubmenu,
  SSwitch,
  STab,
  STabs,
  STable,
  SHierarchicalTable,
  STableColumn,
  STooltip,
  SDialogMixin
}
export default SoramitsuElements
