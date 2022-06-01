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
        { prop1: '21', prop2: 'a12' },
        { prop1: '12', prop2: 'a21' },
        { prop1: '31', prop2: 'a2' },
        { prop1: '13', prop2: 'a32' },
      ]),
    }
  },
  template: `
    <s-table :data="data">
      <s-table-column
        prop="prop1"
        label="Prop 1"
        min-width="100"
        show-overflow-tooltip
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
        label="Prop 1"
        min-width="300"
      />
      <s-table-column
        prop="prop2"
        label="Prop 1"
        width="100"
      />
      <s-table-column
        prop="prop2"
        label="Prop 1"
        min-width="200"
      />
    </s-table>
  `,
}))
