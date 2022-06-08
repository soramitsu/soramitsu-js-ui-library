<script lang="ts">
export default { name: 'STable' }
</script>

<script setup lang="ts">
import type { Slot } from 'vue'
import { ColumnApi, TABLE_API_KEY } from '@/components'
import { IconArrowTop16 } from '@/components/icons'
import { useColumnSort } from '@/components/Table/column-sort.composable'
import { TableRow, CellEventData, HeaderEventData, RowEventData, SortEventData } from './types'
import get from 'lodash/get'
import { useFlexColumns } from '@/components/Table/flex-columns-widths.composable'

type Row = Record<string, unknown>
type CellEventData = [Row, ColumnApi, EventTarget, MouseEvent]
type RowEventData = [Row, ColumnApi, MouseEvent]
type HeaderEventData = [ColumnApi, MouseEvent]

const props = defineProps<{
  data: TableRow[]
}>()

const emit = defineEmits<{
  (event: 'cell-mouse-enter' | 'cell-mouse-leave' | 'cell-click' | 'cell-dblclick', value: CellEventData): void
  (event: 'header-click' | 'header-contextmenu', value: HeaderEventData): void
  (event: 'row-click' | 'row-dblclick' | 'row-contextmenu', value: RowEventData): void
  (event: 'sort-change', value: SortEventData): void
}>()

const columns: ColumnApi[] = shallowReactive([])

const table = ref(null)
const { columnsWidths } = useFlexColumns(columns, table)

const { sortStates, sortedData, handleSortChange, getNextOrder } = useColumnSort(toRef(props, 'data'))

function register(column: ColumnApi) {
  const index = columns.push(column)
  sortStates.set(column, null)

  onScopeDispose(() => {
    columns.splice(index, 1)
    sortStates.delete(column)
  })
}

const api = readonly({
  register,
})

provide(TABLE_API_KEY, api)

function getDefaultCellValue(row: TableRow, column: ColumnApi, index: number) {
  return column.formatter ? column.formatter(row, column, get(row, column.prop), index) : get(row, column.prop)
}

function getSortIconStateClasses(column: ColumnApi) {
  const order = sortStates.get(column)

  if (order !== null) {
    return ['s-table__sort-icon_active', order === 'ascending' ? 's-table__sort-icon_asc' : 's-table__sort-icon_desc']
  }

  return [getNextOrder(column, order) === 'ascending' ? 's-table__sort-icon_asc' : 's-table__sort-icon_desc']
}

function handleSortClick(column: ColumnApi) {
  const newOrder = handleSortChange(column)

  if (!newOrder) return

  emit('sort-change', { column, prop: column.prop, order: newOrder })
}

function handleCellMouseEvent(ctx: { row: TableRow; column: ColumnApi; event: MouseEvent }) {
  if (!ctx.event.target) {
    return
  }

  switch (ctx.event.type) {
    case 'mouseleave': {
      emit('cell-mouse-leave', [ctx.row, ctx.column, ctx.event.target, ctx.event])
      break
    }
    case 'mouseenter': {
      emit('cell-mouse-enter', [ctx.row, ctx.column, ctx.event.target, ctx.event])
      break
    }
    case 'click': {
      emit('cell-click', [ctx.row, ctx.column, ctx.event.target, ctx.event])
      emit('row-click', [ctx.row, ctx.column, ctx.event])
      break
    }
    case 'dblclick': {
      emit('cell-dblclick', [ctx.row, ctx.column, ctx.event.target, ctx.event])
      emit('row-dblclick', [ctx.row, ctx.column, ctx.event])
      break
    }
    case 'contextmenu': {
      emit('row-contextmenu', [ctx.row, ctx.column, ctx.event])
      break
    }
  }
}

function handleHeaderMouseEvent(ctx: { column: ColumnApi; event: MouseEvent }) {
  if (!ctx.event.target) {
    return
  }

  switch (ctx.event.type) {
    case 'click': {
      handleSortClick(ctx.column)
      emit('header-click', [ctx.column, ctx.event])
      break
    }
    case 'contextmenu': {
      emit('header-contextmenu', [ctx.column, ctx.event])
      break
    }
  }
}
</script>

<template>
  <div
    ref="table"
    class="s-table"
  >
    <div class="s-table__header-wrapper">
      <table class="s-table__header w-full">
        <thead>
          <tr class="s-table__tr">
            <th
              v-for="(column, columnIndex) in columns"
              :key="column.prop"
              class="s-table__th py-12px sora-tpg-ch3"
              :class="[
                `s-table__th_align_${column.headerAlign}`,
                column.className,
                column.labelClassName,
                {
                  's-table__th_sortable': column.sortable,
                  'cursor-pointer': column.sortable,
                },
              ]"
              :style="`width: ${columnsWidths[columnIndex]}px`"
              @click="handleHeaderMouseEvent({ column, 'event': $event })"
              @contextmenu="handleHeaderMouseEvent({ column, 'event': $event })"
            >
              <div class="s-table__cell inline-flex items-center px-16px">
                <component
                  :is="column.headerSlot"
                  v-if="column.headerSlot"
                  v-bind="{ column, columnIndex }"
                />
                <template v-else>
                  {{ column.label }}
                </template>
                <IconArrowTop16
                  class="s-table__sort-icon inline ml-10px"
                  :class="getSortIconStateClasses(column)"
                />
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="s-table__body-wrapper">
      <table class="s-table__body w-full">
        <tbody>
          <tr
            v-for="(row, rowIndex) in sortedData"
            :key="JSON.stringify(row)"
            class="s-table__tr"
          >
            <td
              v-for="(column, columnIndex) in columns"
              :key="column.prop"
              class="s-table__td py-12px sora-tpg-p3"
              :class="[`s-table__td_align_${column.align}`, column.className]"
              :style="rowIndex === 0 ? `width: ${columnsWidths[columnIndex]}px` : ''"
              @mouseenter="handleCellMouseEvent({ row, column, 'event': $event })"
              @mouseleave="handleCellMouseEvent({ row, column, 'event': $event })"
              @click="handleCellMouseEvent({ row, column, 'event': $event })"
              @dblclick="handleCellMouseEvent({ row, column, 'event': $event })"
              @contextmenu="handleCellMouseEvent({ row, column, 'event': $event })"
            >
              <div
                class="s-table__cell px-16px"
                :class="{
                  's-table__cell_has-tooltip': column.showOverflowTooltip,
                }"
                :title="column.showOverflowTooltip ? get(row, column.prop) : null"
              >
                <component
                  :is="column.cellSlot"
                  v-if="column.cellSlot"
                  v-bind="{ row, column, rowIndex }"
                />
                <template v-else>
                  {{ getDefaultCellValue(row, column, rowIndex) }}
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-table {
  &__body,
  &__header {
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    border: none;
  }

  &__tr:hover > &__td {
    background-color: theme.token-as-var('sys.color.background-hover');
    border-left: none;
    border-right: none;
  }

  &__td,
  &__th {
    min-height: 48px;
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

  &__th {
    color: theme.token-as-var('sys.color.content-tertiary');
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
  }
}
</style>
