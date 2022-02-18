import './SRadioAtom.scss'

import { FunctionalComponent, h, Transition, mergeProps, PropType } from 'vue'
import { RadioButtonSize } from './const'

interface Props {
  checked?: boolean
  size: RadioButtonSize
}

const component: FunctionalComponent<Props> = (props, { attrs }) => {
  return h(
    'div',
    mergeProps(
      {
        class: [
          's-radio-atom',
          `s-radio-atom_size_${props.size}`,
          {
            's-radio-atom_checked': props.checked ?? false,
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

component.props = {
  size: {
    type: String as PropType<RadioButtonSize>,
    required: true,
  },
  checked: Boolean,
}

export default component
