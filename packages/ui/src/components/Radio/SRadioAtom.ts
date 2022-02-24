import './SRadioAtom.scss'

import { FunctionalComponent, Transition, mergeProps, PropType } from 'vue'
import { RadioButtonSize } from './types'

interface Props {
  checked?: boolean
  disabled?: boolean
  /**
   * Forced hover activation. Useful when it is a part of a larger component.
   */
  hover?: boolean
  size: RadioButtonSize
}

const SRadioAtom: FunctionalComponent<Props> = (props, { attrs }) => {
  return h(
    'div',
    mergeProps(
      {
        class: [
          's-radio-atom',
          `s-radio-atom_size_${props.size}`,
          {
            's-radio-atom_checked': props.checked ?? false,
            's-radio-atom_disabled': props.disabled ?? false,
            's-radio-atom_hover': props.hover ?? false,
          },
        ],
      },
      attrs,
    ),
    [
      h(
        Transition,
        {
          name: 's-radio-atom__dot-transition',
        },
        {
          default: () => (props.checked ? h('div', { class: 's-radio-atom__dot' }) : null),
        },
      ),
    ],
  )
}

SRadioAtom.props = {
  size: {
    type: String as PropType<RadioButtonSize>,
    required: true,
  },
  disabled: Boolean,
  hover: Boolean,
  checked: Boolean,
}

SRadioAtom.displayName = SRadioAtom.name

export default SRadioAtom
