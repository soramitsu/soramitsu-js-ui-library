<script lang="ts">
import { defineBem } from '@soramitsu-ui/bem'
import { TABLE_COLUMN_ALIGN_VALUES } from './consts'

const bem = defineBem('s-table')
  .elem('header')
  .elem('header-wrapper')
  .elem('tr', (b) => b.mod('current'))
  .elem('th', (b) => b.mod('align', TABLE_COLUMN_ALIGN_VALUES).mod('sortable'))
  .elem('td', (b) => b.mod('align', TABLE_COLUMN_ALIGN_VALUES))
  .elem('cell', (b) => b.mod('has-tooltip').mod('has-hover'))
  .elem('sort-icon')
  .elem('body')
  .elem('body-wrapper')
  .elem('expand-icon', (b) => b.mod('active'))
  .elem('details-icon')
  .elem('expanded-block')
  .elem('expanded-cell')
  .elem('empty-block')
  .elem('empty-text')
  .elem('append-wrapper')
  .build()
</script>

<script setup lang="ts">
import type { CSSProperties, ShallowRef, Slot } from 'vue'
import { MaybeElementRef, not } from '@vueuse/core'
import { get, findLast } from 'lodash-es'
import { SCheckboxAtom } from '@/components/Checkbox'
import { IconArrowTop16, IconArrowsChevronDownRounded24, IconArrowsChevronRightXs24 } from '@/components/icons'
import { useColumnSort } from './use-column-sort'
import {
  TableRow,
  TableCellEventData,
  TableHeaderEventData,
  TableRowEventData,
  TableSortEventData,
  TableColumnSortOrder,
  TableCellConfigCallbackParams,
  TableRowConfigCallbackParams,
  TableHeaderCellConfigCallbackParams,
} from './types'
import { useFlexColumns } from './use-flex-columns-widths'
import { useRowSelect } from './use-row-select'
import { useColumnExpand } from './use-column-expand'
import { isDefaultColumn, isDetailsColumn, isExpandColumn, isRecord, isSelectionColumn } from './utils'
import { TableActionColumnApi, TableColumnApi, TABLE_API_KEY } from './api'
import { useTableHeights } from './use-table-heights'

// vue can't infer Object prop type from CSSProperties and logs warnings and this helps
type CSSObject = Partial<CSSProperties>

const props = withDefaults(
  defineProps<{
    /**
     * Table data
     * */
    data?: TableRow[]
    /**
     * Set the default sort column and order.
     * The `prop` is used to set default sort column, the `order` - to set default sort order.
     * If `prop` and `order` aren't set, then order defaults to `ascending`.
     * */
    defaultSort?: { prop: string; order: TableColumnSortOrder } | null
    /**
     * Table's height. By default, it has an `auto` height.
     * If its value is a number, the height is measured in pixels;
     * if its value is a string, the height is affected by external styles
     * */
    height?: string | number
    /**
     * Table's max-height. The height of the table starts from auto until it reaches the maxHeight limit.
     * The `maxHeight` is measured in pixels, same as height
     * */
    maxHeight?: string | number
    /**
     * Whether width of column automatically fits its container
     * */
    fit?: boolean
    /**
     * Whether table header is visible
     * */
    showHeader?: boolean
    /**
     * Whether current row is highlighted
     * */
    highlightCurrentRow?: boolean
    /**
     * Key of current row, a set only prop
     * */
    currentRowKey?: string | number
    /**
     * Function that returns custom class names for a row, or a string assigning class names for every row
     * */
    rowClassName?: string | ((param: TableRowConfigCallbackParams) => string)
    /**
     * Function that returns custom style for a row, or an object assigning custom style for every row
     * */
    rowStyle?: CSSObject | ((param: TableRowConfigCallbackParams) => CSSObject)
    /**
     * Function that returns custom class names for a cell, or a string assigning class names for every cell
     * */
    cellClassName?: string | ((param: TableCellConfigCallbackParams) => string)
    /**
     * Function that returns custom style for a cell, or an object assigning custom style for every cell
     * */
    cellStyle?: CSSObject | ((param: TableCellConfigCallbackParams) => CSSObject)
    /**
     * Function that returns custom class names for a row in table header, or a string assigning class names for every row in table header
     * */
    headerRowClassName?: string | (() => string)
    /**
     * Function that returns custom style for a row in table header, or an object assigning custom style for every row in table header
     * */
    headerRowStyle?: CSSObject | (() => CSSObject)
    /**
     * Function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header
     * */
    headerCellClassName?: string | ((param: TableHeaderCellConfigCallbackParams) => string)
    /**
     * Function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header
     * */
    headerCellStyle?: CSSObject | ((param: TableHeaderCellConfigCallbackParams) => CSSObject)
    /**
     * Data row key extraction to optimize rendering. Required if `reserve-selection` is on.
     * When it is a string, multi-level access is supported, e.g. `user.info.id`,
     * but `user.info[0].id` is not supported, in which case a function should be used.
     * */
    rowKey?: string | ((row: TableRow) => unknown) | null
    /**
     * Displayed text when data is empty. You can customize this area by using `empty` slot.
     * */
    emptyText?: string
    /**
     * Whether to expand all rows by default.
     * Works when the table has a column with `type="expand"`
     * */
    defaultExpandAll?: boolean
    /**
     * Which rows to expand. Keys passed into this prop are the ones that
     * are computed by the `row-key` prop.
     * */
    expandRowKeys?: unknown[]

    /** TODO: make something with it when tooltip will be ready (and so use tooltip) */
    // tooltipEffect: 'dark' | 'light'

    /**
     * Controls the behavior of master checkbox in multi-select tables when only some rows are selected
     * */
    selectOnIndeterminate?: boolean
  }>(),
  {
    data: () => [],
    defaultSort: null,
    height: '',
    maxHeight: '',
    emptyText: '',
    defaultExpandAll: false,
    rowKey: null,
    fit: true,
    expandRowKeys: () => [],
    showHeader: true,
    rowClassName: '',
    rowStyle: () => ({}),
    cellClassName: '',
    cellStyle: () => ({}),
    headerRowClassName: '',
    headerRowStyle: () => ({}),
    headerCellClassName: '',
    headerCellStyle: () => ({}),
    selectOnIndeterminate: true,
    highlightCurrentRow: false,
    currentRowKey: '',
  },
)

/* eslint-disable @typescript-eslint/unified-signatures */
const emit = defineEmits<{
  (event: 'cell-mouse-enter', ...value: TableCellEventData): void
  (event: 'cell-mouse-leave', ...value: TableCellEventData): void
  (event: 'cell-click', ...value: TableCellEventData): void
  (event: 'cell-dblclick', ...value: TableCellEventData): void
  (event: 'header-click', ...value: TableHeaderEventData): void
  (event: 'header-contextmenu', ...value: TableHeaderEventData): void
  (event: 'row-click', ...value: TableRowEventData): void
  (event: 'row-dblclick', ...value: TableRowEventData): void
  (event: 'row-contextmenu', ...value: TableRowEventData): void
  (event: 'sort-change', value: TableSortEventData): void
  (event: 'selection-change', value: TableRow[]): void
  (event: 'select-all', value: TableRow[]): void
  (event: 'select', ...value: [TableRow[], TableRow]): void
  (event: 'expand-change', ...value: [TableRow, TableRow[]]): void
  (event: 'current-change', ...value: [TableRow | null, TableRow | null]): void
  (event: 'click:row-details', value: TableRow): void
}>()

const columns: (TableColumnApi | TableActionColumnApi)[] = shallowReactive([])
const { data, selectOnIndeterminate, fit, showHeader, height, maxHeight, expandRowKeys, currentRowKey } = toRefs(props)
const rowKeys = shallowReactive(new Map<TableRow, unknown>())
const keyRows = shallowReactive(new Map<unknown, TableRow>())
const activeExpandColumn = computed(() => findLast(columns, isExpandColumn))
const activeSelectionColumn = computed(() => findLast(columns, isSelectionColumn))

const tableWrapper: MaybeElementRef = ref(null)
const tableSizes = reactive({
  height: 0,
  width: 0,
})
useResizeObserver(tableWrapper, (entries) => {
  setTimeout(() => {
    tableSizes.width = entries[0].contentRect.width
    tableSizes.height = entries[0].contentRect.height
  })
})

const headerWrapper: MaybeElementRef = ref(null)
const headerHeight = ref(0)
useResizeObserver(headerWrapper, (entries) => {
  setTimeout(() => {
    headerHeight.value = entries[0].contentRect.height
  })
})
whenever(not(showHeader), () => {
  headerHeight.value = 0
})

const { columnsWidths, columnsWidthsSum } = useFlexColumns(columns, toRef(tableSizes, 'width'), fit)
const { tableHeightStyles, bodyHeightStyles } = useTableHeights({
  propHeight: height,
  propMaxHeight: maxHeight,
  headerHeight,
  tableHeight: toRef(tableSizes, 'height'),
})
const { expandedRows, toggleRowExpanded } = useColumnExpand()
const { sortState, sortedData, sortExplicitly, handleSortChange, getNextOrder, applyCurrentSort, clearSort } =
  useColumnSort(data)
const { selectedRows, isAllSelected, isSomeSelected, toggleAllSelection, toggleRowSelection } = useRowSelect(
  sortedData,
  reactive({ selectOnIndeterminate }),
)

const currentRow: ShallowRef<TableRow | null> = shallowRef(null)

function isCurrentRow(row: TableRow) {
  return currentRow.value === toRaw(row)
}

function setCurrentRow(row: TableRow | null) {
  currentRow.value = toRaw(row)
}

watch([keyRows, currentRowKey], () => {
  setCurrentRow(keyRows.get(currentRowKey.value) ?? null)
})

const isSortedOnce = ref(false)

if (props.defaultSort) {
  watchOnce(toRef(sortState, 'column'), () => {
    isSortedOnce.value = true
  })
}

if (props.defaultExpandAll) {
  data.value.forEach((row) => toggleRowExpanded(row))
}

watch([data, columns], () => {
  if (props.defaultSort && !isSortedOnce.value) {
    sort(props.defaultSort)

    return
  }

  applyCurrentSort()
})

watch(
  data,
  () => {
    rowKeys.clear()
    keyRows.clear()

    if (props.rowKey) {
      data.value.forEach((row) => {
        const key = getRowKey(row)
        rowKeys.set(row, key)
        keyRows.set(key, row)
      })
    }
  },
  { immediate: true },
)

watch([keyRows, expandRowKeys], () => {
  expandedRows.clear()

  expandRowKeys.value.forEach((key) => {
    const row = keyRows.get(key)

    if (row) {
      toggleRowExpanded(row, true)
    }
  })
})

let storedSelectedRowsKeys: unknown[] = []
watch(keyRows, () => {
  selectedRows.clear()

  if (activeSelectionColumn.value?.reserveSelection) {
    const newStoredSelectedRowsKeys: typeof storedSelectedRowsKeys = []

    storedSelectedRowsKeys.forEach((key) => {
      const row = keyRows.get(key)

      if (row) {
        toggleRowSelection(row)
        newStoredSelectedRowsKeys.push(key)
      }
    })

    storedSelectedRowsKeys = newStoredSelectedRowsKeys
  }
})

function manualToggleAllSelection(column: TableActionColumnApi) {
  toggleAllSelection(column.selectable)
  storedSelectedRowsKeys = [...selectedRows].map((row) => rowKeys.get(row))
}

function manualToggleRowSelection(row: TableRow, value?: boolean) {
  toggleRowSelection(row, value)
  storedSelectedRowsKeys = [...selectedRows].map((row) => rowKeys.get(row))
}

function manualClearSelection() {
  selectedRows.clear()
  storedSelectedRowsKeys = []
}

function register(column: TableColumnApi | TableActionColumnApi) {
  const index = columns.push(column)

  onScopeDispose(() => {
    columns.splice(index, 1)
  })
}

const api = readonly({ register })
provide(TABLE_API_KEY, api)

function sort({ prop, order }: { prop: string; order: TableColumnSortOrder }) {
  const column = getColumnByProp(prop)

  if (column) {
    sortExplicitly(column, order)
  }
}

defineExpose({
  /**
   * used in multiple selection Table, clear user selection
   * */
  clearSelection: manualClearSelection,
  /**
   * used in multiple selection Table, toggle if a certain row is selected.
   * With the second parameter, you can directly set if this row is selected
   * */
  toggleRowSelection: manualToggleRowSelection,
  /**
   * used in multiple selection Table, toggle the selected state of all rows
   * */
  toggleAllSelection: () => {
    if (activeSelectionColumn.value) {
      manualToggleAllSelection(activeSelectionColumn.value)
    }
  },
  /**
   * used in expandable Table or tree Table, toggle if a certain row is expanded.
   * With the second parameter, you can directly set if this row is expanded or collapsed
   * */
  toggleRowExpansion: toggleRowExpanded,
  /**
   * sort Table manually. Property prop is used to set sort column, property order is used to set sort order
   * */
  sort,
  /**
   * clear sorting, restore data to the original order
   * */
  clearSort,
  /**
   * used in single selection Table, set a certain row selected.
   * If called without any parameter, it will clear selection.
   * */
  setCurrentRow,
})

function getColumnByProp(prop: string) {
  return columns.filter(isDefaultColumn).find((column) => column.prop === prop)
}

function getRowKey(row: TableRow) {
  if (typeof props.rowKey === 'string') {
    if (props.rowKey.includes('.')) {
      return row[props.rowKey]
    }

    let keys = props.rowKey.split('.')
    let current: unknown = row

    for (let key of keys) {
      if (isRecord(current) && key in current) {
        current = current[key]
      }
    }

    return current
  }

  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }
}

function getStyleOrClass<T extends object | string>(prop: T | (() => T), args?: undefined): T | undefined
function getStyleOrClass<T extends object | string, S>(prop: T | ((args: S) => T), args: S): T | undefined
function getStyleOrClass<T extends object | string, S>(prop: T | ((args: S) => T), args: S): T | undefined {
  if (typeof prop === 'function') {
    return prop(args)
  }

  return prop || undefined
}

function isCheckBoxDisabled(column: TableActionColumnApi, row: TableRow, index: number) {
  return !column.selectable || column.selectable(row, index)
}

function getDefaultCellValue(row: TableRow, column: TableColumnApi, index: number) {
  return column.formatter ? column.formatter(row, column, get(row, column.prop), index) : get(row, column.prop)
}

function getCellTooltipContent(row: TableRow, column: TableColumnApi | TableActionColumnApi) {
  if (!column.showOverflowTooltip || !isDefaultColumn(column)) {
    return
  }

  return String(get(row, column.prop))
}

function getSortIconStateClasses(column: TableColumnApi) {
  let order = null

  if (column === sortState.column) {
    order = sortState.order
  }

  if (order !== null) {
    return ['s-table__sort-icon_active', order === 'ascending' ? 's-table__sort-icon_asc' : 's-table__sort-icon_desc']
  }

  return [getNextOrder(column, order) === 'ascending' ? 's-table__sort-icon_asc' : 's-table__sort-icon_desc']
}

function handleSortClick(column: TableColumnApi) {
  handleSortChange(column)
  emit('sort-change', { column, prop: column.prop, order: sortState.order })
}

function handleAllSelect(column: TableActionColumnApi) {
  manualToggleAllSelection(column)
  const selectedArray = [...selectedRows]
  emit('select-all', selectedArray)
  emit('selection-change', selectedArray)
}

function handleRowSelect(row: TableRow) {
  manualToggleRowSelection(row)
  const selectedArray = [...selectedRows]
  emit('select', selectedArray, row)
  emit('selection-change', selectedArray)
}

function handleRowExpand(row: TableRow) {
  toggleRowExpanded(row)
  emit('expand-change', row, [...expandedRows])
}

function handleRowDetails(row: TableRow) {
  emit('click:row-details', row)
}

function handleCellMouseEvent(ctx: {
  row: TableRow
  column: TableColumnApi | TableActionColumnApi
  event: MouseEvent
}) {
  if (!ctx.event.target) {
    return
  }

  const rawRow = toRaw(ctx.row)

  switch (ctx.event.type) {
    case 'mouseleave': {
      emit('cell-mouse-leave', rawRow, ctx.column, ctx.event.target, ctx.event)
      break
    }
    case 'mouseenter': {
      emit('cell-mouse-enter', rawRow, ctx.column, ctx.event.target, ctx.event)
      break
    }
    case 'click': {
      if (isExpandColumn(ctx.column)) {
        handleRowExpand(rawRow)
        break
      }

      if (isDetailsColumn(ctx.column)) {
        handleRowDetails(rawRow)
        break
      }

      const oldCurrentRow = currentRow
      setCurrentRow(rawRow)

      emit('cell-click', rawRow, ctx.column, ctx.event.target, ctx.event)
      emit('row-click', rawRow, ctx.column, ctx.event)
      emit('current-change', currentRow.value, oldCurrentRow.value)
      break
    }
    case 'dblclick': {
      emit('cell-dblclick', rawRow, ctx.column, ctx.event.target, ctx.event)
      emit('row-dblclick', rawRow, ctx.column, ctx.event)
      break
    }
    case 'contextmenu': {
      emit('row-contextmenu', rawRow, ctx.column, ctx.event)
      break
    }
  }
}

function handleHeaderMouseEvent(ctx: { column: TableColumnApi | TableActionColumnApi; event: MouseEvent }) {
  if (!ctx.event.target) {
    return
  }

  switch (ctx.event.type) {
    case 'click': {
      if (isDefaultColumn(ctx.column) && ctx.column.sortable) {
        handleSortClick(ctx.column)
      }

      emit('header-click', ctx.column, ctx.event)
      break
    }
    case 'contextmenu': {
      emit('header-contextmenu', ctx.column, ctx.event)
      break
    }
  }
}
</script>

<template>
  <div
    ref="tableWrapper"
    :class="bem._"
    data-testid="table"
    :style="tableHeightStyles"
  >
    <div
      v-if="showHeader"
      ref="headerWrapper"
      :class="bem.headerWrapper"
    >
      <table
        :class="bem.header"
        class="w-full"
        :style="`width: ${columnsWidthsSum}px`"
      >
        <thead>
          <tr
            data-testid="table-header-row"
            :class="[bem.tr, getStyleOrClass(headerRowClassName)]"
            :style="getStyleOrClass(headerRowStyle)"
          >
            <th
              v-for="(column, columnIndex) in columns"
              :key="column.id"
              class="px-0 sora-tpg-ch3"
              :class="[
                bem.th,
                bem[`th_align_${column.headerAlign}`],
                column.className,
                column.labelClassName,
                column.id,
                {
                  [bem.th_sortable]: column.sortable,
                  'cursor-pointer': column.sortable,
                },
                getStyleOrClass(headerCellClassName, { column, columnIndex }),
              ]"
              :style="{
                'width': `${columnsWidths[columnIndex]}px`,
                ...getStyleOrClass(headerCellStyle, { column, columnIndex }),
              }"
              data-testid="table-header-cell"
              @click="handleHeaderMouseEvent({ column, 'event': $event })"
              @contextmenu="handleHeaderMouseEvent({ column, 'event': $event })"
            >
              <div
                :class="bem.cell"
                class="inline-flex items-center px-16px"
              >
                <template v-if="isDefaultColumn(column)">
                  <component
                    :is="column.headerSlot"
                    v-if="column.headerSlot"
                    v-bind="{ column, columnIndex }"
                  />
                  <template v-else>
                    {{ column.label }}
                  </template>
                  <IconArrowTop16
                    v-if="column.sortable"
                    class="inline ml-10px"
                    :class="[bem.sortIcon, getSortIconStateClasses(column)]"
                  />
                </template>

                <template v-else-if="isSelectionColumn(column)">
                  <SCheckboxAtom
                    :class="{ 'cursor-pointer': data.length }"
                    data-testid="table-header-selection-checkbox"
                    size="xl"
                    :checked="isSomeSelected ? (isAllSelected ? true : 'mixed') : false"
                    :disabled="!data.length"
                    @click.stop="data.length && handleAllSelect(column)"
                  />
                </template>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      :class="bem.bodyWrapper"
      :style="bodyHeightStyles"
    >
      <table
        :class="bem.body"
        class="w-full"
        :style="{ 'width': `${columnsWidthsSum}px` }"
      >
        <tbody>
          <template
            v-for="(row, rowIndex) in sortedData"
            :key="rowKey ? rowKeys.get(row) : rowIndex"
          >
            <tr
              :class="[
                bem.tr,
                getStyleOrClass(rowClassName, { row, rowIndex }),
                { [bem.tr_current]: highlightCurrentRow && isCurrentRow(row) },
              ]"
              :style="getStyleOrClass(rowStyle, { row, rowIndex })"
              data-testid="table-row"
            >
              <!-- eslint-disable-next-line vuejs-accessibility/mouse-events-have-key-events vuejs-accessibility/click-events-have-key-events -->
              <td
                v-for="(column, columnIndex) in columns"
                :key="column.id"
                class="s-table__td p-0 sora-tpg-p3"
                :class="[
                  bem.td,
                  bem[`td_align_${column.align}`],
                  column.id,
                  column.className,
                  getStyleOrClass(cellClassName, { row, rowIndex, column, columnIndex }),
                ]"
                :style="{
                  'width': rowIndex === 0 ? `${columnsWidths[columnIndex]}px` : '',
                  ...getStyleOrClass(cellStyle, { row, rowIndex, column, columnIndex }),
                }"
                data-testid="table-cell"
                @mouseenter="handleCellMouseEvent({ row, column, 'event': $event })"
                @mouseleave="handleCellMouseEvent({ row, column, 'event': $event })"
                @click="handleCellMouseEvent({ row, column, 'event': $event })"
                @dblclick="handleCellMouseEvent({ row, column, 'event': $event })"
                @contextmenu="handleCellMouseEvent({ row, column, 'event': $event })"
              >
                <div
                  class="h-full flex flex-col justify-center"
                  :class="[
                    bem.cell,
                    {
                      [bem.cell_hasTooltip]: column.showOverflowTooltip,
                      [bem.cell_hasHover]: isDetailsColumn(column),
                      'cursor-pointer': isExpandColumn(column) || isDetailsColumn(column),
                      'px-16px': !isDetailsColumn(column),
                    },
                  ]"
                  :title="getCellTooltipContent(row, column)"
                >
                  <template v-if="isDefaultColumn(column)">
                    <component
                      :is="column.cellSlot"
                      v-if="column.cellSlot"
                      v-bind="{ row, column, rowIndex }"
                    />
                    <template v-else>
                      {{ getDefaultCellValue(row, column, rowIndex) }}
                    </template>
                  </template>

                  <template v-else-if="isSelectionColumn(column)">
                    <SCheckboxAtom
                      :class="{ 'cursor-pointer': !isCheckBoxDisabled(column, row, rowIndex) }"
                      size="xl"
                      data-testid="table-selection-checkbox"
                      :checked="selectedRows.has(row)"
                      :disabled="isCheckBoxDisabled(column, row, rowIndex)"
                      @click.stop="isCheckBoxDisabled(column, row, rowIndex) || handleRowSelect(row)"
                    />
                  </template>

                  <template v-else-if="isExpandColumn(column)">
                    <IconArrowsChevronDownRounded24
                      :class="[bem.expandIcon, { [bem.expandIcon_active]: expandedRows.has(row) }]"
                      data-testid="table-expanded-icon"
                    />
                  </template>

                  <template v-else-if="isDetailsColumn(column)">
                    <IconArrowsChevronRightXs24
                      :class="bem.detailsIcon"
                      class="self-center"
                    />
                  </template>
                </div>
              </td>
            </tr>

            <tr
              v-if="activeExpandColumn && expandedRows.has(row)"
              :class="bem.expandedBlock"
              data-testid="table-expanded-block"
            >
              <td
                :class="bem.expandedCell"
                class="py-16px px-32px"
                :colspan="columns.length"
              >
                <component
                  :is="activeExpandColumn.cellSlot"
                  v-if="activeExpandColumn.cellSlot"
                  v-bind="{ row, 'column': activeExpandColumn, rowIndex }"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div
        v-if="!data.length"
        data-testid="table-empty-block"
        :class="bem.emptyBlock"
        class="flex justify-center items-center h-60px"
      >
        <span
          class="sora-tpg-p3"
          :class="bem.emptyText"
        >
          <slot name="empty">
            {{ emptyText || 'No Data' }}
          </slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        :class="bem.appendWrapper"
      >
        <slot name="append" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-table {
  &__body-wrapper {
    overflow-y: auto;
  }

  &__body,
  &__header {
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    border: none;
  }

  &__tr:hover > &__td,
  &__tr_current > &__td {
    background-color: theme.token-as-var('sys.color.background');
  }

  &__td,
  &__th {
    height: 48px;
    border-bottom: 1px solid theme.token-as-var('sys.color.border-secondary');
    transition: background-color 0.25s ease;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;

    &_align_center {
      text-align: center;
    }

    &_align_left {
      text-align: left;
    }

    &_align_right {
      text-align: right;
    }
  }

  &__tr:last-child &__td,
  &__expanded-block:last-child &__expanded-cell {
    border-bottom: none;
  }

  &__th {
    color: theme.token-as-var('sys.color.content-tertiary');
  }

  &__expanded-cell {
    background-color: theme.token-as-var('sys.color.background');
    border-bottom: 1px solid theme.token-as-var('sys.color.border-secondary');
    min-height: 40px;
  }

  &__sort-icon {
    visibility: hidden;
    fill: currentColor;

    &_active {
      visibility: visible;
      fill: theme.token-as-var('sys.color.primary');
    }

    &_asc {
      transform: rotateZ(180deg);
    }
  }

  &__expand-icon {
    fill: currentColor;
    transition: 0.15s ease-in-out transform;

    &_active {
      transform: rotateZ(180deg);
    }
  }

  &__th_sortable:hover &__sort-icon {
    visibility: visible;
  }

  &__cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;

    &_has-tooltip {
      white-space: nowrap;
    }

    &_has-hover:hover {
      background: theme.token-as-var('sys.color.background-hover');
    }
  }

  &__details-icon {
    color: theme.token-as-var('sys.color.content-quaternary');
    fill: currentColor;
  }

  &__cell:hover &__details-icon {
    color: theme.token-as-var('sys.color.content-secondary');
    fill: currentColor;
  }

  &__empty-text {
    color: theme.token-as-var('sys.color.content-tertiary');
  }

  &__append-wrapper {
    overflow: hidden;
  }
}
</style>
