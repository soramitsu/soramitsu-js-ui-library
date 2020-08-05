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
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
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
               <s-table-column prop="name" label="Name" width="180"></s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
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
