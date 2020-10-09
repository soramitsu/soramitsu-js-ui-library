import { withKnobs, select } from '@storybook/addon-knobs'

import { SDivider, SRow } from '../components'
import { DividerDirection, ContentPosition } from '../components/Divider/consts'

export default {
  component: SDivider,
  title: 'Design System/Components/Divider',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SRow, SDivider },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <span>First text paragraph</span>
               <s-divider
                 :style="direction === 'vertical' ? { height: '56px' } : {}"
                 :direction="direction"
                 :content-position="contentPosition"
               >
                 Content between divider
               </s-divider>
               <span>Second text paragraph</span>
             </s-row>`,
  props: {
    direction: {
      default: select('Direction', Object.values(DividerDirection), DividerDirection.HORIZONTAL)
    },
    contentPosition: {
      default: select('Content position', Object.values(ContentPosition), ContentPosition.CENTER)
    }
  }
})
