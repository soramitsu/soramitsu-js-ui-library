<template>
  <el-table
    ref="table"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :border="border"
    :size="size"
    :fit="fit"
    :show-header="showHeader"
    :highlight-current-row="highlightCurrentRow"
    :current-row-key="currentRowKey"
    :row-class-name="rowClassName"
    :row-style="rowStyle"
    :cell-class-name="cellClassName"
    :cell-style="cellStyle"
    :header-row-class-name="headerRowClassName"
    :header-row-style="headerRowStyle"
    :header-cell-class-name="headerCellClassName"
    :header-cell-style="headerCellStyle"
    :row-key="rowRey"
    :empty-text="emptyText"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :default-sort="defaultSort"
    :tooltip-effect="tooltipEffect"
    :show-summary="showSummary"
    :sum-text="sumText"
    :summary-method="summaryMethod"
    :span-method="spanMethod"
    :select-on-indeterminate="selectOnIndeterminate"
    :indent="indent"
    :lazy="lazy"
    :load="load"
    :tree-props="treeProps"
    @select="handleSelect"
    @select-all="handleSelectAll"
    @selection-change="handleSelectionChange"
    @cell-mouse-enter="handleCellMouseEnter"
    @cell-mouse-leave="handleCellMouseLeave"
    @cell-click="handleCellClick"
    @cell-dblclick="handleCellDoubleClick"
    @row-click="handleRowClick"
    @row-contextmenu="handleRowContextMenu"
    @row-dblclick="handleRowDoubleClick"
    @header-click="handleHeaderClick"
    @header-contextmenu="handleHeaderContextMenu"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    @current-change="handleCurrentChange"
    @header-dragend="handleHeaderDragend"
    @expand-change="handleExpandChange"
  >
    <slot></slot>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { ElTable } from 'element-ui/types/table'

import { TooltipTheme } from '../Tooltip'
import { TableSize } from './consts'

@Component
export default class STable extends Vue {
  /**
   * Data of the table
   */
  @Prop({ default: () => [], type: Array }) readonly data!: Array<any>
  /**
   * Table's height
   */
  @Prop({ default: 'auto' }) readonly height!: string | number
  /**
   * Table's max height
   */
  @Prop() readonly maxHeight!: string | number
  /**
   * Table's stripe attribute
   */
  @Prop({ default: false, type: Boolean }) readonly stripe!: boolean
  /**
   * Table's vertical border attribute
   */
  @Prop({ default: false, type: Boolean }) readonly border!: boolean
  /**
   * Table's size attribute
   */
  @Prop({ default: TableSize.BIG, type: String }) readonly size!: string
  /**
   * TODO
   */
  @Prop({ default: true, type: Boolean }) readonly fit!: boolean
  /**
   * TODO
   */
  @Prop({ default: true, type: Boolean }) readonly showHeader!: boolean
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly highlightCurrentRow!: boolean
  /**
   * TODO
   */
  @Prop() readonly currentRowKey!: string | number
  /**
   * TODO
   */
  @Prop() readonly rowClassName!: string | (({ row, rowIndex }) => string)
  /**
   * TODO
   */
  @Prop() readonly rowStyle!: object | (({ row, rowIndex }) => object)
  /**
   * TODO
   */
  @Prop() readonly cellClassName!: string | (({ row, column, rowIndex, columnIndex }) => string)
  /**
   * TODO
   */
  @Prop() readonly cellStyle!: object | (({ row, column, rowIndex, columnIndex }) => object)
  /**
   * TODO
   */
  @Prop() readonly headerRowClassName!: object | (({ row, rowIndex }) => object)
  /**
   * TODO
   */
  @Prop() readonly headerRowStyle!: object | (({ row, rowIndex }) => object)
  /**
   * TODO
   */
  @Prop() readonly headerCellClassName!: string | (({ row, column, rowIndex, columnIndex }) => string)
  /**
   * TODO
   */
  @Prop() readonly headerCellStyle!: object | (({ row, column, rowIndex, columnIndex }) => object)
  /**
   * TODO
   */
  @Prop() readonly rowRey!: string | (({ row }) => string)
  /**
   * TODO
   */
  @Prop({ default: 'No data', type: String }) readonly emptyText!: string
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly defaultExpandAll!: boolean
  /**
   * TODO
   */
  @Prop() readonly expandRowKeys!: Array<any>
  /**
   * TODO
   */
  @Prop({ type: Object }) readonly defaultSort!: object
  /**
   * TODO
   */
  @Prop({ default: TooltipTheme.DARK, type: String }) readonly tooltipEffect!: string
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly showSummary!: boolean
  /**
   * TODO
   */
  @Prop({ default: 'Sum', type: String }) readonly sumText!: string
  /**
   * TODO
   */
  @Prop() readonly summaryMethod!: ({ columns, data }) => string
  /**
   * TODO
   */
  @Prop() readonly spanMethod!: ({ row, column, rowIndex, columnIndex }) => any
  /**
   * TODO
   */
  @Prop({ default: true, type: Boolean }) readonly selectOnIndeterminate!: boolean
  /**
   * TODO
   */
  @Prop({ default: 16, type: Number }) readonly indent!: number
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly lazy!: boolean
  /**
   * TODO
   */
  @Prop() readonly load!: (row, treeNode, resolve) => any
  /**
   * TODO
   */
  @Prop({ type: Object }) readonly treeProps!: object

  @Ref('table') table!: ElTable

  handleSelect (selection, row): void {
    this.$emit('select', selection, row)
  }

  handleSelectAll (selection): void {
    this.$emit('select-all', selection)
  }

  handleSelectionChange (selection): void {
    this.$emit('selection-change', selection)
  }

  handleCellMouseEnter (row, column, cell, event): void {
    this.$emit('cell-mouse-enter', row, column, cell, event)
  }

  handleCellMouseLeave (row, column, cell, event): void {
    this.$emit('cell-mouse-leave', row, column, cell, event)
  }

  handleCellClick (row, column, cell, event): void {
    this.$emit('cell-click', row, column, cell, event)
  }

  handleCellDoubleClick (row, column, cell, event): void {
    this.$emit('cell-double-click', row, column, cell, event)
  }

  handleRowClick (row, column, event): void {
    this.$emit('row-click', row, column, event)
  }

  handleRowContextMenu (row, column, event): void {
    this.$emit('row-context-menu', row, column, event)
  }

  handleRowDoubleClick (row, column, event): void {
    this.$emit('row-double-click', row, column, event)
  }

  handleHeaderClick (column, event): void {
    this.$emit('header-click', column, event)
  }

  handleHeaderContextMenu (column, event): void {
    this.$emit('header-context-menu', column, event)
  }

  handleSortChange ({ column, prop, order }): void {
    this.$emit('sort-change', column, prop, order)
  }

  handleFilterChange (filters): void {
    this.$emit('filter-change', filters)
  }

  handleCurrentChange (currentRow, oldCurrentRow): void {
    this.$emit('current-change', currentRow, oldCurrentRow)
  }

  handleHeaderDragend (newWidth, oldWidth, column, event): void {
    this.$emit('header-dragend', newWidth, oldWidth, column, event)
  }

  handleExpandChange (row, ...args): void {
    this.$emit('expand-change', row, ...args)
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-table__header {
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    height: 4px;
    top: 7px;
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: $color-neutral-hover;
  border-left: none;
  border-right: none;
}
.el-table__body {
  tr {
    &.hover-row {
      > td,
      &.current-row > td,
      &.el-table__row--striped > td,
      &.el-table__row--striped.current-row > td {
        background-color: $color-neutral-hover;
        border-left: none;
        border-right: none;
      }
    }
  }
}
.el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  padding-left: 13px;
}
.el-table thead {
  color: $color-neutral-tertiary;
}
.el-table--group,
.el-table--border,
.el-table th.is-leaf,
.el-table td,
.el-table--border th {
  border-color: $color-neutral-placeholder;
}
.el-table--group::after,
.el-table--border::after {
  background-color: $color-neutral-placeholder;
}
.el-table:not(.el-table--border)::before {
  background-color: $color-basic-white;
}
</style>
