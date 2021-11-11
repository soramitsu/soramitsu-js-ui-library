import { FunctionalComponent, h } from 'vue'
import IconChevronBottom from '~icons/mdi/chevron-down'

interface Props {
  rotate?: boolean
}

const component: FunctionalComponent<Props> = ({ rotate }) => {
  import('./SSelectChevron.scss')

  return h(IconChevronBottom, {
    class: [
      's-select-chevron',
      {
        's-select-chevron--rotate': rotate,
      },
    ],
  })
}

component.props = { rotate: Boolean }

export default component
