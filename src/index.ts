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
  SImage,
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
  SScrollbar,
  SScrollSectionItem,
  SScrollSections,
  SSelect,
  SSkeleton,
  SSkeletonItem,
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
import { Float, Integer, Button } from './directives'
import { Components } from './types/components'
import { Directives } from './types/directives'
import { setTheme, setDesignSystem, setLocale } from './utils'
import DesignSystem from './types/DesignSystem'
import Theme from './types/Theme'
import Locale from './types/Locale'
import { SoramitsuUIStorePlugin, ElementUIPlugin } from './plugins'
import { Loading, Message, MessageBox, Notification } from './plugins/elementUI'
import { SDialogMixin } from './mixins'

// use to install all library dependencies
const SoramitsuElements = {
  install (vue: typeof Vue, options?: any): void {
    vue.use(SoramitsuUIStorePlugin, options)
    vue.use(ElementUIPlugin)
    vue.directive(Directives.Float, Float)
    vue.directive(Directives.Integer, Integer)
    vue.directive(Directives.Button, Button)
    vue.use(SApp)
    vue.use(SAside)
    vue.use(SBreadcrumb)
    vue.use(SBreadcrumbItem)
    vue.use(SButton)
    vue.use(SButtonGroup)
    vue.use(SCard)
    vue.use(SCheckbox)
    vue.use(SCol)
    vue.use(SCollapse)
    vue.use(SCollapseItem)
    vue.use(SContainer)
    vue.use(SDatePicker)
    vue.use(SDesignSystemProvider)
    vue.use(SDialog)
    vue.use(SDivider)
    vue.use(SDropdown)
    vue.use(SDropdownItem)
    vue.use(SFooter)
    vue.use(SForm)
    vue.use(SFormItem)
    vue.use(SHeader)
    vue.use(SIcon)
    vue.use(SImage)
    vue.use(SInput)
    vue.use(SFloatInput)
    vue.use(SJsonInput)
    vue.use(SMain)
    vue.use(SMenu)
    vue.use(SMenuItem)
    vue.use(SMenuItemGroup)
    vue.use(SOption)
    vue.use(SOptionGroup)
    vue.use(SPagination)
    vue.use(SRadio)
    vue.use(SRadioGroup)
    vue.use(SRow)
    vue.use(SScrollbar)
    vue.use(SScrollSectionItem)
    vue.use(SScrollSections)
    vue.use(SSelect)
    vue.use(SSkeleton)
    vue.use(SSkeletonItem)
    vue.use(SSlider)
    vue.use(SSubmenu)
    vue.use(SSwitch)
    vue.use(STab)
    vue.use(STabs)
    vue.use(STable)
    vue.use(SHierarchicalTable)
    vue.use(STableColumn)
    vue.use(STooltip)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SoramitsuElements, {})
}

export {
  setTheme,
  Theme,
  setDesignSystem,
  DesignSystem,
  setLocale,
  Locale,
  Components,
  Directives,
  Loading,
  Message,
  MessageBox,
  Notification,
  SDialogMixin,
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
  SImage,
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
  SScrollbar,
  SScrollSectionItem,
  SScrollSections,
  SSelect,
  SSkeleton,
  SSkeletonItem,
  SSlider,
  SSubmenu,
  SSwitch,
  STab,
  STabs,
  STable,
  SHierarchicalTable,
  STableColumn,
  STooltip
}
export default SoramitsuElements
