import { withKnobs, select } from '@storybook/addon-knobs'

import { SDivider, SRow } from '../components'
import { ContentPosition, DividerDirection, DividerType } from '../components/Divider'

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
                 :type="type"
                 :direction="direction"
                 :content-position="contentPosition"
               >
                 Content between divider
               </s-divider>
               <span>Second text paragraph</span>
             </s-row>`,
  props: {
    type: {
      default: select('Type', Object.values(DividerType), DividerType.SECONDARY)
    },
    direction: {
      default: select('Direction', Object.values(DividerDirection), DividerDirection.HORIZONTAL)
    },
    contentPosition: {
      default: select('Content position', Object.values(ContentPosition), ContentPosition.CENTER)
    }
  }
})
