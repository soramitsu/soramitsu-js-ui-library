import { VueConstructor } from 'vue'
import { Components } from '../../types/components'

import STable from './STable.vue'
import SHierarchicalTable from './SHierarchicalTable.vue'
import STableColumn from './STableColumn.vue'
import { ColumnAlignment, ColumnFixedPosition, ColumnType, SortDirection } from './consts'

STable.install = function (vue: VueConstructor) {
  vue.component(Components.STable, STable)
}

SHierarchicalTable.install = function (vue: VueConstructor) {
  vue.component(Components.SHierarchicalTable, SHierarchicalTable)
}

STableColumn.install = function (vue: VueConstructor) {
  vue.component(Components.STableColumn, STableColumn)
}

export {
  STable,
  SHierarchicalTable,
  STableColumn,
  ColumnAlignment,
  ColumnFixedPosition,
  ColumnType,
  SortDirection
}
