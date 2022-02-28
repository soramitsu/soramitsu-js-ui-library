import './SCheckboxAtom.scss'

import IconBlank from '~icons/ic/round-check-box-outline-blank'
import IconCheck from '~icons/ic/round-check-box'
import IconMixed from '~icons/ic/round-indeterminate-check-box'

import { FunctionalComponent, mergeProps, PropType } from 'vue'
import { CheckboxSize, CheckboxState } from './types'

interface Props {
  size: CheckboxSize
  checked?: CheckboxState
  hover?: boolean
  disabled?: boolean
}

// function iconByState(state: Check)

// const ICON_MAP: Record<CheckboxState, Component> = {
//   'mixed'
// }

// <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M9 1.25L3.5 6.75L1 4.25" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

// const IconCheck = () =>
//   h(
//     'svg',
//     {
//       width: '1em',
//       height: '0.8em',
//       viewBox: '0 0 10 8',
//     },
//     [h('path', { d: 'M9 1.25L3.5 6.75L1 4.25' })],
//   )

// const IconMixed = () =>
//   h(
//     'svg',
//     {
//       width: '1em',
//       height: '0.25em',
//       viewBox: '0 0 12 3',
//     },
//     [h('path', { d: 'M1.33331 1.5H10.6666' })],
//   )

// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fluent" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 12 12"><path fill="currentColor" d="M9.765 3.205a.75.75 0 0 1 .03 1.06l-4.25 4.5a.75.75 0 0 1-1.075.015L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.705 1.704l3.72-3.939a.75.75 0 0 1 1.06-.03Z"></path></svg>

// const IconEmpty = () => h('svg', {}, h('path'))

const SCheckboxAtom: FunctionalComponent<Props> = (props, { attrs }) => {
  const icon = props.checked ? (props.checked === 'mixed' ? IconMixed : IconCheck) : IconBlank

  return h(
    icon,
    mergeProps(
      {
        class: [
          's-checkbox-atom',
          {
            's-checkbox-atom_disabled': props.disabled ?? false,
            's-checkbox-atom_hover': props.hover ?? false,
          },
        ],
        'data-size': props.size,
        'data-checked': props.checked ?? false,
      },
      attrs,
    ),
  )

  // return h(props)
  // return h(
  //   'div',
  //   mergeProps(
  //     {
  //       class: [
  //         's-checkbox-atom',
  //         // `s-checkbox-atom_size_${props.size}`,
  //         {
  //           's-checkbox-atom_disabled': props.disabled ?? false,
  //           's-checkbox-atom_hover': props.hover ?? false,
  //         },
  //       ],
  //       'data-size': props.size,
  //       'data-checked': props.checked ?? false,
  //       // 'data-disabled': props.disabled ?? false,
  //       // 'data-hover': props.hover ?? false,
  //     },
  //     attrs,
  //   ),
  //   h(
  //     Transition,
  //     { name: 's-checkbox-atom__icon-transition' },
  //     {
  //       default: () => (props.checked ? (props.checked === 'mixed' ? IconMixed() : IconCheck()) : null),
  //     },
  //   ),
  // )
}

// fluent:checkmark-12-filled

SCheckboxAtom.displayName = 'SCheckboxAtom'

// more efficient?
// SCheckboxAtom.props = ['size', 'checked', 'hover', 'disabled']

SCheckboxAtom.props = {
  size: {
    type: String as PropType<CheckboxSize>,
    required: true,
  },
  checked: {
    type: [Boolean, String] as PropType<CheckboxState>,
  },
  hover: Boolean,
  disabled: Boolean,
}

export default SCheckboxAtom
