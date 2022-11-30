import { Meta, Story } from '@storybook/vue'

import { SPagination, SRow } from '../components'
import { BorderRadius } from '../types'

export default {
  component: SPagination,
  title: 'Design System/Components/Pagination',
  argTypes: {
    layout: {
      name: 'Layout',
      control: {
        type: 'text'
      },
      defaultValue: 'total, sizes, pager, prev, next, jumper'
    },
    total: {
      name: 'Total',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 400
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    small: {
      name: 'Small',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    background: {
      name: 'Background',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    prevText: {
      name: 'Prev text',
      control: {
        type: 'text'
      },
      defaultValue: ''
    },
    nextText: {
      name: 'Next text',
      control: {
        type: 'text'
      },
      defaultValue: ''
    },
    perPageText: {
      name: 'Per page text',
      control: {
        type: 'text'
      },
      defaultValue: 'Rows per page'
    },
    totalText: {
      name: 'Total text',
      control: {
        type: 'text'
      },
      defaultValue: 'Total'
    },
    ofText: {
      name: 'Of text',
      control: {
        type: 'text'
      },
      defaultValue: 'of'
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SRow, SPagination },
  props: Object.keys(argTypes),
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
  methods: {
    handleSizeChange: (newSize: number) => console.log(`@size-change=${newSize}`),
    handleCurrentChange: (newCurrent: number) => console.log(`@current-change=${newCurrent}`),
    handlePrevClick: (newCurrent: number) => console.log(`@prev-click=${newCurrent}`),
    handleNextClick: (newCurrent: number) => console.log(`@next-click=${newCurrent}`)
  }
})

export const small: Story = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination :total="400" small></s-pagination>
             </s-row>`
})

export const withBackground: Story = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination :total="400" background></s-pagination>
             </s-row>`
})

export const disabled: Story = () => ({
  components: { SRow, SPagination },
  template: `<s-row class="s-flex" style="flex: 1; flex-direction: column;">
               <s-pagination :total="400" disabled></s-pagination>
               <s-pagination :total="400" small disabled></s-pagination>
               <s-pagination :total="400" background disabled></s-pagination>
             </s-row>`
})
