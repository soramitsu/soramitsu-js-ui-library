import { Meta, Story } from '@storybook/vue'

import { STable, STableColumn } from '../../components'
import { ColumnAlignment } from '../../components/Table'

import { tableData } from './STable.stories'

const tableFilters = [
  { text: '< 2016-01-01', value: 1 },
  { text: 'between 2016-01-01 and 2016-05-01', value: 2 },
  { text: 'between 2016-05-01 and 2018-05-05', value: 3 },
  { text: '> 2019-01-01', value: 4 }
]

export default {
  component: STableColumn,
  title: 'Design System/Components/Table/Table Column',
  excludeStories: /.*Data$/,
  argTypes: {
    label: {
      name: 'Label',
      control: {
        type: 'text'
      },
      defaultValue: 'Date'
    },
    align: {
      name: 'Align',
      control: {
        type: 'select',
        options: Object.values(ColumnAlignment)
      },
      defaultValue: ColumnAlignment.LEFT
    },
    headerAlign: {
      name: 'Header align',
      control: {
        type: 'select',
        options: Object.values(ColumnAlignment)
      },
      defaultValue: ColumnAlignment.LEFT
    },
    showOverflowTooltip: {
      name: 'Show overflow tooltip',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    filterMultiple: {
      name: 'Filter multiple',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    // config args
    useFilters: {
      table: {
        disable: true
      }
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { STable, STableColumn },
  props: Object.keys(argTypes),
  template: `
  <s-table :data="tableData" border>
    <s-table-column type="selection"></s-table-column>
    <s-table-column
      prop="date"
      width="80"
      resizable
      :label="label"
      :show-overflow-tooltip="showOverflowTooltip"
      :align="align"
      :header-align="headerAlign"
      :filters="useFilters && tableFilters"
      :filterMethod="useFilters && filterDate"
      :filter-multiple="useFilters && filterMultiple"
    >
    </s-table-column>
    <s-table-column prop="address" label="Address"></s-table-column>
    <s-table-column type="expand">Hello</s-table-column>
  </s-table>
  `,
  data: () => ({
    useFilters: Boolean(args.useFilters),
    tableData,
    tableFilters,
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
  })
})

export const Configurable = Template.bind({})

export const WithFilters = Template.bind({})
WithFilters.args = {
  useFilters: true
}
