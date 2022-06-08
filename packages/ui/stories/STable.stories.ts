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
        { prop1: '21', prop2: 'a12', prop3: 'b12', prop4: 'c12' },
        { prop1: '12', prop2: 'a421', prop3: 'b21', prop4: 'c21' },
        { prop1: '31', prop2: 'a2', prop3: 'b2', prop4: 'c2' },
        { prop1: '13', prop2: 'a32', prop3: 'b32', prop4: 'c32' },
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
        prop="prop3"
        label="Prop 3"
        width="100"
        align="right"
        header-align="center"
      />
      <s-table-column
        prop="prop4"
        label="Prop 4"
        min-width="50"
        align="center"
        header-align="right"
      />
    </s-table>
  `,
}))
