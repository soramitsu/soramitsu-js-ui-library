<template>
  <el-table-column
    :type="type"
    :index="index"
    :label="label"
    :column-key="columnKey"
    :prop="prop"
    :width="computedWidth"
    :min-width="minWidth"
    :fixed="fixedPosition || false"
    :render-header="renderHeader"
    :sortable="sortable"
    :sort-method="sortMethod"
    :sort-by="sortBy"
    :sort-orders="sortOrders"
    :resizable="resizable"
    :formatter="formatter"
    :show-overflow-tooltip="showOverflowTooltip"
    :align="align"
    :header-align="headerAlign"
    :class-name="className"
    :label-class-name="labelClassName"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
    :filters="filters"
    :filter-placement="filterPlacement"
    :filter-multiple="filterMultiple"
    :filter-method="filterMethod"
    :filtered-value="filteredValue"
  >
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData"><slot :name="name" v-bind="slotData" /></template>
  </el-table-column>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Inject } from 'vue-property-decorator'

import { Size } from '@/types'

import { SortDirection, ColumnAlignment } from './consts'

@Component
export default class STableColumn extends Vue {
  /**
   * Type of the column. Can be `"selection"`, `"index"` or `"expand"`.
   * If it's not defined, then it will be usual column without modifications
   */
  @Prop({ default: '', type: String }) readonly type!: string
  /**
   * Customize indices for each row. It works on columns with `type="index"`.
   * Can be `number` or `(index: number) => number`
   */
  @Prop() readonly index!: number | ((index: number) => number)
  /**
   * Label of the column
   */
  @Prop({ default: '', type: String }) readonly label!: string
  /**
   * Column's key. If you need to use the `filter-change` event,
   * you need this attribute to identify which column is being filtered
   */
  @Prop({ default: '', type: String }) readonly columnKey!: string
  /**
   * Name of the field
   */
  @Prop({ default: '', type: String }) readonly prop!: string
  /**
   * Column width in pixels. For instance, `width="80"`
   */
  @Prop({ default: '', type: String }) readonly width!: string
  /**
   * Column minimum width in pixels. Columns with `width` has a fixed width,
   * while columns with `min-width` has a width that is distributed in proportion.
   * For instance, `min-width="80"`
   */
  @Prop({ default: '', type: String }) readonly minWidth!: string
  /**
   * Will column be fixed at `"left"` or `"right"` position.
   * If it's not defined, then it will be not fixed by default.
   */
  @Prop({ default: '', type: String }) readonly fixedPosition!: string
  /**
   * Render function for table header of this column.
   * `(h, { column, $index }) => any`
   */
  @Prop() readonly renderHeader!: (h, { column, $index }) => any
  /**
   * Will column be sorted. Possible values: `true`, `false`, `"custom"`
   * Remote sorting can be done by setting this attribute to `"custom"`
   * and listening to the `sort-change` event of the Table component
   */
  @Prop({ default: false }) readonly sortable!: boolean | 'custom'
  /**
   * Sorting method like `Array.sort`, works when `sortable` is true.
   * `(a, b) => number`
   */
  @Prop() readonly sortMethod!: (a, b) => number
  /**
   * Specify which property to sort by, works when `sortable` is true and `sort-method` is undefined.
   * If set to an Array, the column will sequentially sort by the next property if the previous one is equal.
   *
   * Can be `string`, `Array<string>` or `(row, index) => string | Array<string>`
   */
  @Prop() readonly sortBy!: string | Array<string> | ((row, index) => string | Array<string>)
  /**
   * The order of the sorting strategies used when sorting the data,
   * works when `sortable` is true.
   * Accepts an array, as the user clicks on the header,
   * the column is sorted in order of the elements in the array.
   *
   * The elements in the array need to be one of the following: `"ascending"`, `"descending"` and `null`.
   *
   * `[SortDirection.ASC, SortDirection.DESC, null]` is set by default
   */
  @Prop({ default: () => [SortDirection.ASC, SortDirection.DESC, null], type: Array }) readonly sortOrders!: Array<any>
  /**
   * Can column be resized. It works only when the table has `border` set to true.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly resizable!: boolean
  /**
   * A function that formats cell content. `(row, column, cellValue, index) => any`
   */
  @Prop() readonly formatter!: (row, column, cellValue, index) => any
  /**
   * Will extra content be hidden and be replaced with a tooltip when hovering on the cell.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly showOverflowTooltip!: boolean
  /**
   * Alignment property of the table column. Can be `"left"`, `"center"` or `"right"`.
   *
   * `"left"` is set by default
   */
  @Prop({ default: ColumnAlignment.LEFT, type: String }) readonly align!: string
  /**
   * Alignment property of the column header. Can be `"left"`, `"center"` or `"right"`.
   *
   * `"left"` is set by default
   */
  @Prop({ default: ColumnAlignment.LEFT, type: String }) readonly headerAlign!: string
  /**
   * Class name of cells in the column
   */
  @Prop({ type: String }) readonly className!: string
  /**
   * Class name of the label of this column
   */
  @Prop({ default: '', type: String }) readonly labelClassName!: string
  /**
   * A function that determines if a certain row can be selected.
   * It works when `type="selection"`. `(row, index) => boolean`
   */
  @Prop() readonly selectable!: (row, index) => boolean
  /**
   * Will selection be reserved after data refreshing.
   * It works when `type="selection"`.
   *
   * `row-key` is required for this to work.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly reserveSelection!: boolean
  /**
   * TODO: create custom dropdown menu with filters
   */
  @Prop({ type: Array }) readonly filters!: Array<{ text; value }>
  /**
   * TODO: comment it when it'll be implemented
   */
  @Prop({ default: '', type: String }) readonly filterPlacement!: string
  /**
   * TODO: comment it when it'll be implemented
   */
  @Prop({ default: false, type: Boolean }) readonly filterMultiple!: boolean
  /**
   * TODO: comment it when it'll be implemented
   */
  @Prop() readonly filterMethod!: (value, row, column) => boolean
  /**
   * TODO: comment it when it'll be implemented
   */
  @Prop({ type: Array }) readonly filteredValue!: Array<any>

  @Inject({ default: '', from: 'sTable' }) sTable

  get computedWidth () {
    const tableBorder = (this.sTable || {}).border
    const size = (this.sTable || {}).size
    return !this.width && this.type === 'selection' && !tableBorder && size ? ({
      [Size.SMALL]: '30px',
      [Size.MEDIUM]: '32px',
      [Size.BIG]: '36px'
    }[size]) : this.width
  }
}
</script>
