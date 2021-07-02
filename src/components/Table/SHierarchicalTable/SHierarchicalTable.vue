<template>
  <div class="s-hierarchical-table">
    <s-table
      :class="{
        's-hierarchical-table-level': true,
        's-hierarchical-table-level--last': levelIndex === data.length - 1
      }"
      v-for="(level, levelIndex) in data"
      :key="level.name"
      :data="level.content"
      :size="computedSize"
      :border="false"
      :row-class-name="({ row }) => getRowClassName({ row, levelIndex })"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @row-click="row => $emit('row-click', row, level)"
      :empty-text="emptyText"
    >
      <s-table-column
        v-if="levelIndex === (data.length - 1)"
        type="selection"
      />
      <s-table-column
        prop="value"
        :label="level.name"
      >
        <template slot-scope="{ row }">
          <slot
            :name="level.id"
            :value="row"
          >
            {{ row }}
          </slot>
        </template>
      </s-table-column>
    </s-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Mixins } from 'vue-property-decorator'

import SizeMixin from '../../../mixins/SizeMixin'
import STable from '../STable/STable.vue'
import STableColumn from '../STableColumn/STableColumn.vue'

@Component({
  components: {
    STable,
    STableColumn
  }
})
export default class SHierarchicalTable extends Mixins(SizeMixin) {
  /**
   * Data of the table.
   *
   * By default it's set to an empty array
   */
  @Prop({ default: () => [], type: Array }) readonly data!: Array<any>
  /**
   * Path of the table.
   *
   * By default it's set to an empty array
   */
  @Prop({ default: () => [], type: Array }) readonly path!: Array<any>
  /**
   * A message for an empty data array.
   *
   * By default it's set to `"No data"`
   */
  @Prop({ default: 'No data', type: String }) readonly emptyText!: string

  handleSelect (selection: Array<any>, row: any): void {
    this.$emit('select', selection, row)
  }

  handleSelectAll (selection: Array<any>): void {
    this.$emit('select-all', selection)
  }

  handleSelectionChange (selection: Array<any>): void {
    this.$emit('selection-change', selection)
  }

  getRowClassName ({ levelIndex, row }) {
    const classes = ['s-hierarchical-table-row']
    if (this.path[levelIndex] === row) {
      classes.push('s-hierarchical-table-row--active')
    }
    return classes.join(' ')
  }

  @Provide('sHierarchicalTable') sHierarchicalTable = this
}
</script>
