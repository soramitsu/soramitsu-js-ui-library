import { Meta, Story } from '@storybook/vue'

import { SHierarchicalTable } from '../../components'
import { Size } from '../../types'

const tableData = [
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

export default {
  component: SHierarchicalTable,
  title: 'Design System/Components/Table/Hierarchical Table',
  excludeStories: /.*Data$/,
  argTypes: {
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.BIG
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SHierarchicalTable },
  props: Object.keys(argTypes),
  template: `<s-hierarchical-table
               :data="tableData"
               :size="size"
             >
               <template slot="date" slot-scope="{ value }">
                 <b>{{ value }}</b>
               </template>
             </s-hierarchical-table>`,
  data: () => ({
    tableData
  })
})

export const Configurable = Template.bind({})
