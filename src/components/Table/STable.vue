<template>
  <el-table
    ref="table"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :border="border"
    :size="computedSize"
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
    :tooltip-effect="tooltipTheme"
    :show-summary="showTotal"
    :sum-text="totalText"
    :summary-method="totalMethod"
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
    <slot slot="empty" name="empty"></slot>
  </el-table>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import { ElTable } from 'element-ui/types/table'
import { ElTableColumn } from 'element-ui/types/table-column'

import SizeMixin from '../../mixins/SizeMixin'
import { TooltipTheme } from '../Tooltip'
import { SortDirection } from './consts'

@Component
export default class STable extends Mixins(SizeMixin) {
  /**
   * Data of the table.
   *
   * By default it's set to an empty array
   */
  @Prop({ default: () => [], type: Array }) readonly data!: Array<any>
  /**
   * Table's height. It can be `number` with a number of pixels.
   * Also, it can be a string with CSS height value.
   *
   * `"auto"` by default
   */
  @Prop({ default: 'auto' }) readonly height!: string | number
  /**
   * Table's max height. It can be `number` with a number of pixels.
   * Also, it can be a string with CSS height value
   */
  @Prop() readonly maxHeight!: string | number
  /**
   * Table's stripe attribute.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly stripe!: boolean
  /**
   * Table's vertical border attribute.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly border!: boolean
  /**
   * Will width of column automatically be fit its container.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly fit!: boolean
  /**
   * Will table header be visible.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly showHeader!: boolean
  /**
   * Will selected row be highlighted.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly highlightCurrentRow!: boolean
  /**
   * A key of the current row. Can be `string` or `number`
   */
  @Prop() readonly currentRowKey!: string | number
  /**
   * Custom class names for the row. Can be `string` or `({ row, rowIndex }) => string`
   */
  @Prop() readonly rowClassName!: string | (({ row, rowIndex }) => string)
  /**
   * Custom styles for the row. Can be `object` or `({ row, rowIndex }) => object`
   */
  @Prop() readonly rowStyle!: object | (({ row, rowIndex }) => object)
  /**
   * Custom class names for the cell. Can be `string` or `({ row, column, rowIndex, columnIndex }) => string`
   */
  @Prop() readonly cellClassName!: string | (({ row, column, rowIndex, columnIndex }) => string)
  /**
   * Custom styles for the cell. Can be `object` or `({ row, column, rowIndex, columnIndex }) => object`
   */
  @Prop() readonly cellStyle!: object | (({ row, column, rowIndex, columnIndex }) => object)
  /**
   * Custom class names for the row header. Can be `string` or `({ row, rowIndex }) => string`
   */
  @Prop() readonly headerRowClassName!: string | (({ row, rowIndex }) => string)
  /**
   * Custom styles for the row header. Can be `object` or `({ row, rowIndex }) => object`
   */
  @Prop() readonly headerRowStyle!: object | (({ row, rowIndex }) => object)
  /**
   * Custom class names for the cell header. Can be `string` or `({ row, column, rowIndex, columnIndex }) => string`
   */
  @Prop() readonly headerCellClassName!: string | (({ row, column, rowIndex, columnIndex }) => string)
  /**
   * Custom styles for the cell header. Can be `object` or `({ row, column, rowIndex, columnIndex }) => object`
   */
  @Prop() readonly headerCellStyle!: object | (({ row, column, rowIndex, columnIndex }) => object)
  /**
   * A key of the row data, used for optimizing rendering.
   * Required if `reserve-selection` is true or display tree data.
   * When its type is `string`, multi-level access is supported,
   * e.g. `user.info.id`, but `user.info[0].id` is not supported,
   * in which case `({ row }) => string` should be used.
   */
  @Prop() readonly rowRey!: string | (({ row }) => string)
  /**
   * A message for an empty data array.
   *
   * By default it's set to `"No data"`
   */
  @Prop({ default: 'No data', type: String }) readonly emptyText!: string
  /**
   * Expand all rows by default.
   * It works when the table has a column with `type="expand"` or contains tree structure data
   */
  @Prop({ default: false, type: Boolean }) readonly defaultExpandAll!: boolean
  /**
   * Set expanded rows by this property, prop's value is the keys of expand rows.
   * You should set `row-key` before using this property
   */
  @Prop() readonly expandRowKeys!: Array<any>
  /**
   * Set the default sort column and order object.
   *
   * `prop` is used to set default sort column,
   *
   * `order` is used to set default sort order: `"ascending"`, `"descending"`
   */
  @Prop({ type: Object }) readonly defaultSort!: object
  /**
   * Tooltip theme property. Can be `"dark"` or `"light"`.
   *
   * `"dark"` by default
   */
  @Prop({ default: TooltipTheme.DARK, type: String }) readonly tooltipTheme!: string
  /**
   * Will total row be shown.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly showTotal!: boolean
  /**
   * Text for the total row.
   *
   * `"Tot"` by default
   */
  @Prop({ default: 'Tot', type: String }) readonly totalText!: string
  /**
   * Custom total method. `({ columns, data }) => string`
   */
  @Prop() readonly totalMethod!: ({ columns, data }) => string
  /**
   * Method that returns rowspan and colspan.
   *
   * `({ row, column, rowIndex, columnIndex }) => Array<number> | { rowspan: number; colspan: number }`
   */
  @Prop() readonly spanMethod!: ({ row, column, rowIndex, columnIndex }) => Array<number> | { rowspan: number; colspan: number }
  /**
   * Controls the behavior of master checkbox in multi-select tables
   * when only some rows are selected (but not all).
   *
   * If `true`, all rows will be selected, else deselected.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly selectOnIndeterminate!: boolean
  /**
   * Horizontal indentation of tree data.
   *
   * `16` by default
   */
  @Prop({ default: 16, type: Number }) readonly indent!: number
  /**
   * Will the data will be lazy loaded.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly lazy!: boolean
  /**
   * The method for loading child row data, only works when `lazy` is true.
   * `(row, treeNode, resolve) => any`
   */
  @Prop() readonly load!: (row, treeNode, resolve) => any
  /**
   * A configuration for rendering nested data
   */
  @Prop({ type: Object }) readonly treeProps!: object

  @Ref('table') table!: ElTable

  handleSelect (selection: Array<any>, row: any): void {
    this.$emit('select', selection, row)
  }

  handleSelectAll (selection: Array<any>): void {
    this.$emit('select-all', selection)
  }

  handleSelectionChange (selection: Array<any>): void {
    this.$emit('selection-change', selection)
  }

  handleCellMouseEnter (row: any, column: ElTableColumn, cell: HTMLElement, event: MouseEvent): void {
    this.$emit('cell-mouse-enter', row, column, cell, event)
  }

  handleCellMouseLeave (row: any, column: ElTableColumn, cell: HTMLElement, event: MouseEvent): void {
    this.$emit('cell-mouse-leave', row, column, cell, event)
  }

  handleCellClick (row: any, column: ElTableColumn, cell: HTMLElement, event: MouseEvent): void {
    this.$emit('cell-click', row, column, cell, event)
  }

  handleCellDoubleClick (row: any, column: ElTableColumn, cell: HTMLElement, event: MouseEvent): void {
    this.$emit('cell-double-click', row, column, cell, event)
  }

  handleRowClick (row: any, column: ElTableColumn, event: MouseEvent): void {
    this.$emit('row-click', row, column, event)
  }

  handleRowContextMenu (row: any, column: ElTableColumn, event: MouseEvent): void {
    this.$emit('row-context-menu', row, column, event)
  }

  handleRowDoubleClick (row: any, column: ElTableColumn, event: MouseEvent): void {
    this.$emit('row-double-click', row, column, event)
  }

  handleHeaderClick (column: ElTableColumn, event: MouseEvent): void {
    this.$emit('header-click', column, event)
  }

  handleHeaderContextMenu (column: ElTableColumn, event: MouseEvent): void {
    this.$emit('header-context-menu', column, event)
  }

  handleSortChange ({ column, prop, order }): void {
    this.$emit('sort-change', column, prop, order)
  }

  handleFilterChange (filterPanel: any): void {
    const filterArray = Object.values(filterPanel)[0]
    this.$emit('filter-change', filterArray)
  }

  handleCurrentChange (currentRow: any, oldCurrentRow: any): void {
    this.$emit('current-change', currentRow, oldCurrentRow)
  }

  handleHeaderDragend (newWidth: number, oldWidth: number, column: ElTableColumn, event: MouseEvent): void {
    this.$emit('header-dragend', newWidth, oldWidth, column, event)
  }

  handleExpandChange (row: any, expandedRows: Array<any>): void {
    this.$emit('expand-change', row, expandedRows)
  }

  clearSelection (): void {
    this.table.clearSelection()
  }

  toggleRowSelection (row: object, selected?: boolean): void {
    this.table.toggleRowSelection(row, selected)
  }

  toggleAllSelection (): void {
    this.table.toggleAllSelection()
  }

  toggleRowExpansion (row: object, expanded?: boolean): void {
    this.table.toggleRowExpansion(row, expanded)
  }

  setCurrentRow (row?: object): void {
    this.table.setCurrentRow(row)
  }

  clearSort (): void {
    this.table.clearSort()
  }

  clearFilter (filterName: string): void {
    (this.table as any).clearFilter(filterName)
  }

  clearFilters (): void {
    this.table.clearFilter()
  }

  doLayout (): void {
    this.table.doLayout()
  }

  sort (prop: string, order: SortDirection): void {
    this.table.sort(prop, order)
  }
}
</script>
