import { withKnobs, select } from '@storybook/addon-knobs'

import { SPagination, SRow } from '../components'

export default {
  component: SPagination,
  title: 'Design System/Pagination',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="flex" style="flex: 1; flex-direction: column;">
               <s-pagination
               >
               </s-pagination>
             </s-row>`,
  props: {
  }
})
