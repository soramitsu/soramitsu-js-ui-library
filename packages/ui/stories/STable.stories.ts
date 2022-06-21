import { defineMeta, defineStory } from './util'
import { STable, STableColumn } from '@/lib'

export default defineMeta({
  title: 'Example/Table',
})

export const Configurable = defineStory((args: Record<string, unknown>) => ({
  components: {
    STable,
    STableColumn,
  },
  setup() {
    return {
      args,
      data: ref([
        { prop1: '21', prop2: 'a12', date: 1424631694418, prop4: 'c12' },
        { prop1: '12', prop2: 'a421', date: 1224382694418, prop4: 'c21' },
        { prop1: '31', prop2: 'a2', date: 1524682614418, prop4: 'c2' },
        { prop1: '13', prop2: 'a32', date: 1654642633318, prop4: 'c32' },
      ]),
      formatter: (row: any, column: any, x: number) => new Date(x).toLocaleDateString(),
    }
  },
  template: `
    <s-table :data="data">
      <s-table-column type="selection" :selectable="(row, index) => !!(index % 2)" />
      <s-table-column
        prop="prop1"
        label="Prop 1"
        min-width="100"
        show-overflow-tooltip
        class-name="td-class"
        label-class-name="header-class"
      >
        <template #default="{ row, column, rowIndex }">
          Row #{{ rowIndex }}: {{ row.prop1 }} - custom
        </template>
        
        <template #header="{ column, columnIndex }">
          {{ column.label }} - custom
        </template>
      </s-table-column>

      <s-table-column
        prop="prop2"
        label="Prop 2"
        min-width="200"
        header-align="center"
        align="right"
        sortable
      />
      <s-table-column
        prop="date"
        label="Date"
        width="120"
        align="right"
        :formatter="formatter"
        header-align="center"
        :sort-orders="['descending', 'ascending', null]"
        sortable
      />
      <s-table-column
        prop="prop4"
        label="Prop 4"
        min-width="50"
        align="center"
        header-align="right"
      />
      <s-table-column type="expand">
        <template #default="{ row, column, rowIndex }">
          Expand slot for row #{{ rowIndex }}, where raw date field is {{ row.date }}
        </template>
      </s-table-column>
    </s-table>
  `,
}))
