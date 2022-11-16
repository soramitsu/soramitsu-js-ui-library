import { Meta, Story } from '@storybook/vue'

import { STable, STableColumn } from '../../components'
import { Size } from '../../types'

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

export default {
  component: STable,
  title: 'Design System/Components/Table',
  excludeStories: /.*Data$/,
  argTypes: {
    height: {
      name: 'Height',
      control: {
        type: 'text'
      },
      defaultValue: 'auto'
    },
    stripe: {
      name: 'Stripe',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    border: {
      name: 'Border',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showHeader: {
      name: 'Show header',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.BIG
    },
    highlightCurrentRow: {
      name: 'Highlight current row',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    defaultExpandAll: {
      name: 'Expand all rows',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showTotal: {
      name: 'Show total',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    defaultSort: {
      name: 'Default sort',
      control: {
        type: 'object'
      }
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { STable, STableColumn },
  props: Object.keys(argTypes),
  template: `
  <s-table
    :data="tableData"
    :size="size"
    :height="height"
    :stripe="stripe"
    :border="border"
    :show-header="showHeader"
    :highlight-current-row="highlightCurrentRow"
    :default-expand-all="defaultExpandAll"
    :show-total="showTotal"
    @row-click="alert('click')"
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
  </s-table>
  `,
  data: () => ({
    tableData: tableData
  }),
  methods: {
    alert (message: string) {
      alert(message)
    }
  }
})

export const Configurable = Template.bind({})

export const WithBorder = Template.bind({})
WithBorder.args = {
  border: true
}

export const Striped = Template.bind({})
WithBorder.args = {
  striped: true
}

export const WithAllExpandedRows = Template.bind({})
WithAllExpandedRows.args = {
  defaultExpandAll: true
}

export const WithTotalRow = Template.bind({})
WithTotalRow.args = {
  showTotal: true
}

export const WithDefaultSort = Template.bind({})
WithDefaultSort.args = {
  defaultSort: { prop: 'amount', order: 'descending' }
}
