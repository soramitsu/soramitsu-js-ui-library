import { withKnobs, number, text, boolean } from '@storybook/addon-knobs'

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
                 :total="total"
                 :layout="layout"
                 :disabled="disabled"
                 :small="small"
                 :background="background"
                 :prev-text="prevText"
                 :next-text="nextText"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 @prev-click="handlePrevClick"
                 @next-click="handleNextClick"
               >
               </s-pagination>
             </s-row>`,
  props: {
    layout: {
      default: text('Layout', 'total, sizes, pager, prev, next, jumper')
    },
    total: {
      default: number('Total', 400)
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    small: {
      default: boolean('Small', false)
    },
    background: {
      default: boolean('Background', false)
    },
    prevText: {
      default: text('Prev text', '')
    },
    nextText: {
      default: text('Next text', '')
    }
  },
  methods: {
    handleSizeChange: (newSize: number) => console.log(`@size-change=${newSize}`),
    handleCurrentChange: (newCurrent: number) => console.log(`@current-change=${newCurrent}`),
    handlePrevClick: (newCurrent: number) => console.log(`@prev-click=${newCurrent}`),
    handleNextClick: (newCurrent: number) => console.log(`@next-click=${newCurrent}`)
  }
})
