<template>
  <el-table-column
    ref="tableColumn"
    :type="type"
    :index="index"
    :label="label"
    :column-key="columnKey"
    :prop="prop"
    :width="width"
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
    :class-name="headerAlign"
    :label-class-name="labelClassName"
    :selectable="selectable"
    :reserve-selection="reserveSelection"
    :filters="filters"
    :filter-placement="filterPlacement"
    :filter-multiple="filterMultiple"
    :filter-method="filterMethod"
    :filtered-value="filteredValue"
  >
    <!-- TODO: fix scoped slots with { row, column, $index } data or add possibility to use it -->
    <slot slot="header" name="header"></slot>
    <slot></slot>
  </el-table-column>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

import { ColumnFixedPosition, SortDirection, ColumnAlignment } from './consts'
import { TableColumn } from 'element-ui'

@Component
export default class STableColumn extends Vue {
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly type!: string
  /**
   * TODO
   */
  @Prop() readonly index!: number | ((index: number) => number)
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly label!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly columnKey!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly prop!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly width!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly minWidth!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly fixedPosition!: string
  /**
   * TODO
   */
  @Prop() readonly renderHeader!: (h, { column, $index }) => any
  /**
   * TODO
   */
  @Prop({ default: false }) readonly sortable!: boolean | 'custom'
  /**
   * TODO
   */
  @Prop() readonly sortMethod!: (a, b) => number
  /**
   * TODO
   */
  @Prop() readonly sortBy!: string | Array<string> | ((row, index) => string | Array<string>)
  /**
   * TODO
   */
  @Prop({ default: () => [SortDirection.ASC, SortDirection.DESC, null], type: Array }) readonly sortOrders!: Array<any>
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly resizable!: boolean
  /**
   * TODO
   */
  @Prop() readonly formatter!: (row, column, cellValue, index) => string
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly showOverflowTooltip!: boolean
  /**
   * TODO
   */
  @Prop({ default: ColumnAlignment.LEFT, type: String }) readonly align!: string
  /**
   * TODO
   */
  @Prop({ default: ColumnAlignment.LEFT, type: String }) readonly headerAlign!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly className!: string
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly labelClassName!: string
  /**
   * TODO
   */
  @Prop() readonly selectable!: (row, index) => boolean
  /**
   * TODO
   */
  @Prop({ default: false, type: Boolean }) readonly reserveSelection!: boolean
  /**
   * TODO
   */
  @Prop({ type: Array }) readonly filters!: Array<{ text; value }>
  /**
   * TODO
   */
  @Prop({ default: '', type: String }) readonly filterPlacement!: string
  /**
   * TODO
   */
  @Prop({ default: true, type: Boolean }) readonly filterMultiple!: boolean
  /**
   * TODO
   */
  @Prop() readonly filterMethod!: (value, row, column) => boolean
  /**
   * TODO
   */
  @Prop({ type: Array }) readonly filteredValue!: Array<any>

  @Ref('tableColumn') tableColumn!: TableColumn
}
</script>

<style lang="scss">

</style>
