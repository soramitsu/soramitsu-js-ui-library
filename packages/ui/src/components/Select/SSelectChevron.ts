import { FunctionalComponent, h } from 'vue'
import IconChevronBottom from '~icons/mdi/chevron-down'
import './SSelectChevron.scss'

interface Props {
  rotate?: boolean
}

const component: FunctionalComponent<Props> = ({ rotate }) =>
  h(IconChevronBottom, {
    class: [
      's-select-chevron',
      {
        's-select-chevron_rotate': rotate,
      },
    ],
  })

component.props = { rotate: Boolean }
component.displayName = 'SSelectChevron'

export default component
