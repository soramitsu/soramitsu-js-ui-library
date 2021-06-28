import { withKnobs, number, text, boolean, select } from '@storybook/addon-knobs'

import { SPagination, SRow } from '../components'
import { BorderRadius } from '../types'

export default {
  component: SPagination,
  title: 'Design System/Components/Pagination',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination
                 :total="total"
                 :layout="layout"
                 :disabled="disabled"
                 :small="small"
                 :background="background"
                 :border-radius="borderRadius"
                 :popper-class="borderRadius"
                 :prev-text="prevText"
                 :next-text="nextText"
                 :per-page-text="perPageText"
                 :total-text="totalText"
                 :of-text="ofText"
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
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    },
    prevText: {
      default: text('Prev text', '')
    },
    nextText: {
      default: text('Next text', '')
    },
    perPageText: {
      default: text('Per page text', 'Rows per page')
    },
    totalText: {
      default: text('Total text', 'Total')
    },
    ofText: {
      default: text('Of text', 'of')
    }
  },
  methods: {
    handleSizeChange: (newSize: number) => console.log(`@size-change=${newSize}`),
    handleCurrentChange: (newCurrent: number) => console.log(`@current-change=${newCurrent}`),
    handlePrevClick: (newCurrent: number) => console.log(`@prev-click=${newCurrent}`),
    handleNextClick: (newCurrent: number) => console.log(`@next-click=${newCurrent}`)
  }
})

export const small = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination :total="400" small></s-pagination>
             </s-row>`
})

export const withBackground = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination :total="400" background></s-pagination>
             </s-row>`
})

export const disabled = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination :total="400" disabled></s-pagination>
               <s-pagination :total="400" small disabled></s-pagination>
               <s-pagination :total="400" background disabled></s-pagination>
             </s-row>`
})
