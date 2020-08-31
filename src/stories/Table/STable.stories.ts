import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { STable, STableColumn } from '../../components'
import { TableSize } from '../../components/Table'

export default {
  component: STable,
  title: 'Design System/Table',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const tableData = [
  {
    date: '2017-05-03',
    amount: '1.56',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    amount: '-99',
    address: 'No. 190, Grove St, Los Angeles'
  },
  {
    date: '2018-05-04',
    amount: '0',
    address: 'No. 191, Grove St, Los Angeles'
  },
  {
    date: '2015-05-01',
    amount: '55555',
    address: 'No. 192, Grove St, Los Angeles'
  }
]

export const configurable = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               :size="size"
               :height="height"
               :stripe="stripe"
               :border="border"
               :show-header="showHeader"
               :highlight-current-row="highlightCurrentRow"
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column prop="date" label="Date" width="180"></s-table-column>
               <s-table-column prop="amount" label="Amount" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column label="Index" width="80">
                 <template slot-scope="scope">
                   <span>{{ scope.$index }}</span>
                 </template>
               </s-table-column>
               <s-table-column type="expand">Expanded!</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  }),
  props: {
    height: {
      default: text('Height', 'auto')
    },
    stripe: {
      default: boolean('Stripe', false)
    },
    border: {
      default: boolean('Border', false)
    },
    showHeader: {
      default: boolean('Show header', true)
    },
    size: {
      default: select('Size', Object.values(TableSize), TableSize.BIG)
    },
    highlightCurrentRow: {
      default: boolean('Highlight current row', false)
    }
  }
})

export const withBorder = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               border
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column prop="date" label="Date" width="180"></s-table-column>
               <s-table-column prop="amount" label="Amount" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  })
})

export const striped = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               stripe
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column prop="date" label="Date" width="180"></s-table-column>
               <s-table-column prop="amount" label="Amount" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  })
})

export const withAllExpandedRows = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               default-expand-all
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column prop="date" label="Date" width="180"></s-table-column>
               <s-table-column prop="amount" label="Amount" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  })
})

export const withTotalRow = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               show-total
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column prop="date" label="Date" width="180"></s-table-column>
               <s-table-column prop="amount" label="Amount" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  })
})

export const withDefaultSort = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               :defaultSort="{ prop: 'amount', order: 'descending' }"
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column sortable prop="date" label="Date" width="180"></s-table-column>
               <s-table-column sortable prop="amount" label="Amount" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  })
})
