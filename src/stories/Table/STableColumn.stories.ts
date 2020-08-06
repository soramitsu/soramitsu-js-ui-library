import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { STable, STableColumn } from '../../components'
import { ColumnAlignment } from '../../components/Table'

import { tableData } from './STable.stories'

export default {
  component: STableColumn,
  title: 'Design System/Table/Table Column',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               border
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column
                 prop="date"
                 width="80"
                 resizable
                 :label="label"
                 :show-overflow-tooltip="showOverflowTooltip"
                 :align="align"
                 :header-align="headerAlign"
               >
               </s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData
  }),
  props: {
    label: {
      default: text('Label', 'Date')
    },
    showOverflowTooltip: {
      default: boolean('Show overflow tooltip', true)
    },
    align: {
      default: select('Align', Object.values(ColumnAlignment), ColumnAlignment.LEFT)
    },
    headerAlign: {
      default: select('Header align', Object.values(ColumnAlignment), ColumnAlignment.LEFT)
    }
  }
})

export const withFilters = () => ({
  components: { STable, STableColumn },
  template: `<s-table
               :data="tableData"
               border
             >
               <s-table-column type="selection"></s-table-column>
               <s-table-column
                 prop="date"
                 width="80"
                 resizable
                 label="Date"
                 show-overflow-tooltip
                 :filters="tableFilters"
                 :filterMethod="filterDate"
                 :filter-multiple="filterMultiple"
               >
               </s-table-column>
               <s-table-column prop="address" label="Address"></s-table-column>
               <s-table-column type="expand">Hello</s-table-column>
             </s-table>`,
  data: () => ({
    tableData: tableData,
    tableFilters: [
      { text: '< 2016-01-01', value: 1 },
      { text: 'between 2016-01-01 and 2016-05-01', value: 2 },
      { text: 'between 2016-05-01 and 2018-05-05', value: 3 },
      { text: '> 2019-01-01', value: 4 }
    ],
    filterDate: (value: number, row: any) => {
      const date = new Date(row.date).getTime()
      switch (value) {
        case 1:
          return date < new Date('2016-01-01').getTime()
        case 2:
          return date > new Date('2016-01-01').getTime() && date < new Date('2016-05-01').getTime()
        case 3:
          return date > new Date('2016-05-01').getTime() && date < new Date('2018-05-05').getTime()
        case 4:
          return date > new Date('2019-01-01').getTime()
      }
      return true
    }
  }),
  props: {
    filterMultiple: {
      default: boolean('Filter multiple', false)
    }
  }
})
