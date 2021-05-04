<template>
  <div class="s-hierarchical-table">
    <s-table
      class="s-hierarchical-table-level"
      v-for="(level, levelIndex) in data"
      :key="level.name"
      :data="level.content"
      :size="computedSize"
      :border="false"
      @select="levelIndex === (data.length - 1) ? handleSelect : null"
      @select-all="levelIndex === (data.length - 1) ? handleSelectAll : null"
      @selection-change="levelIndex === (data.length - 1) ? handleSelectionChange : null"
      @row-click="row => $emit('row-click', row, level)"
    >
      <s-table-column
        v-if="levelIndex === (data.length - 1)"
        type="selection"
      />
      <s-table-column
        prop="value"
        :label="level.label"
      >
        <template slot-scope="{ row }">
          <slot
            :name="level.name"
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

import SizeMixin from '../../mixins/SizeMixin'
import STable from './STable.vue'
import STableColumn from './STableColumn.vue'

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

  handleSelect (selection: Array<any>, row: any): void {
    this.$emit('select', selection, row)
  }

  handleSelectAll (selection: Array<any>): void {
    this.$emit('select-all', selection)
  }

  handleSelectionChange (selection: Array<any>): void {
    this.$emit('selection-change', selection)
  }

  @Provide('sHierarchicalTable') sHierarchicalTable = this
}
</script>

<style lang="scss" scoped>
.s-hierarchical-table {
  display: flex;
  width: 100%;
  background: var(--s-color-base-background);
  &-level:not(:last-child) {
    margin-right: 16px;
    border-right: 1px solid var(--s-color-base-border-primary)
  }
}
</style>
