import { text, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { STable, STableColumn } from '../../components'

export default {
  component: STable,
  title: 'Design System/Table',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { STable, STableColumn },
  template: `<s-table :data="tableData" style="width: 100%">
               <s-table-column type="selection"></s-table-column>
               <s-table-column
                 prop="date"
                 label="Date"
                 width="180"
               >
               </s-table-column>
               <s-table-column
                 prop="name"
                 label="Name"
                 width="180"
               >
               </s-table-column>
               <s-table-column
                 prop="address"
                 label="Address"
               >
               </s-table-column>
             </s-table>`,
  data: () => ({
    tableData: [
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
  })
})
