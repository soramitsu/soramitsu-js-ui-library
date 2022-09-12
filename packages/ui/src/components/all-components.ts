// importing every component - for plugin & tests

// it is placed separately from the `index` file because
// `index` file is re-exported from the `lib` file, but there is
// no intention to expose `COMPONENTS` for the end user

import { Component } from 'vue'
import { SButton } from './Button'
// import { SJsonInput } from './JsonInput'
import { SModal, SModalCard } from './Modal'
import { SSelect, SDropdown, SSelectBase, SSelectButton, SSelectChevron, SSelectInput, SSelectOption } from './Select'
import { SToastsDisplay, SToastsProvider } from './Toasts'
import { SNotificationBody, SNotificationsProvider, SUseNotification } from './Notifications'
import { SAlert } from './Alert'
import { SSpinner } from './Spinner'
import { SSwitch } from './Switch'
import { STextField } from './TextField'
import { SPopover, SPopoverWrappedTransition } from './Popover'
import { SProgressBar } from './ProgressBar'
import { STab, STabsPanel } from './Tabs'
import { SBadge } from './Badge'
import { SAccordion, SAccordionItem } from './Accordion'
import { SLink } from './Link'
import { SCollapseTransition } from './Transitions'
import { SRadio, SRadioAtom, SRadioGroup } from './Radio'
import { SCheckboxAtom, SCheckboxSolo } from './Checkbox'
import { SBodyScrollLockProvider } from './BodyScrollLockProvider'
import { SNavigationMenu, SNavigationMenuItem, SNavigationSubmenu } from './NavigationMenu'
import { STable, STableColumn } from './Table'
import { SPagination } from './Pagination'
import { SDatePicker } from './DatePicker'

/**
 * Component names should be identical to their variable names
 */
export const COMPONENTS: Record<string, Component> = {
  SButton,
  // SJsonInput,
  SModal,
  SModalCard,
  SSelect,
  SDropdown,
  SSelectBase,
  SSelectButton,
  SSelectChevron,
  SSelectInput,
  SSelectOption,
  SToastsDisplay,
  SToastsProvider,
  SNotificationBody,
  SNotificationsProvider,
  SUseNotification,
  SAlert,
  SSpinner,
  SPopover,
  SPopoverWrappedTransition,
  SSwitch,
  STextField,
  SProgressBar,
  STab,
  STabsPanel,
  STable,
  STableColumn,
  SBadge,
  SAccordion,
  SAccordionItem,
  SLink,
  SRadio,
  SRadioAtom,
  SRadioGroup,
  SCollapseTransition,
  SCheckboxAtom,
  SCheckboxSolo,
  SBodyScrollLockProvider,
  SNavigationMenu,
  SNavigationMenuItem,
  SNavigationSubmenu,
  SPagination,
  SDatePicker,
}
