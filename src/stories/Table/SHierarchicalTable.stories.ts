import { withKnobs } from '@storybook/addon-knobs'

import { SHierarchicalTable } from '../../components'

export default {
  component: SHierarchicalTable,
  title: 'Design System/Components/Table/Hierarchical Table',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const tableData = [
  {
    name: 'id',
    label: 'ID',
    content: [
      'id-1',
      'id-2',
      'id-3',
      'id-4',
      'id-5'
    ]
  },
  {
    name: 'date',
    label: 'Date',
    content: [
      '01.01.1970',
      '02.01.1970',
      '03.01.1970',
      '04.01.1970',
      '05.01.1970'
    ]
  },
  {
    name: 'file',
    label: 'File',
    content: [
      'file-1.txt',
      'file-2.txt',
      'file-3.txt',
      'file-4.txt',
      'file-5.txt'
    ]
  }
]

export const configurable = () => ({
  components: { SHierarchicalTable },
  template: `<s-hierarchical-table
               :data="tableData"
             >
               <template slot="date" slot-scope="{ value }">
                 {{ value }} - test
               </template>
             </s-hierarchical-table>`,
  data: () => ({
    tableData: tableData
  })
})
