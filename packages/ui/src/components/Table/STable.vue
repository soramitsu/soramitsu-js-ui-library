<script lang="ts">
export default { name: 'STable' }
</script>

<script setup lang="ts">
import type { Slot } from 'vue'
import { ColumnApi, TABLE_API_KEY } from '@/components'

type Row = Record<string, unknown>
type CellEventData = [Row, ColumnApi, EventTarget, MouseEvent]
type RowEventData = [Row, ColumnApi, MouseEvent]
type HeaderEventData = [ColumnApi, MouseEvent]

const props = defineProps<{
  data: Row[]
}>()

const emit = defineEmits<{
  (event: 'cell-mouse-enter' | 'cell-mouse-leave' | 'cell-click' | 'cell-dblclick', value: CellEventData): void
  (event: 'header-click' | 'header-contextmenu', value: HeaderEventData): void
  (event: 'row-click' | 'row-dblclick' | 'row-contextmenu', value: RowEventData): void
}>()

const columns: ColumnApi[] = shallowReactive([])

function register(column: ColumnApi) {
  const index = columns.push(column)

  onScopeDispose(() => columns.splice(index, 1))
}

const api = readonly({
  register,
})

provide(TABLE_API_KEY, api)

const table = ref(null)
const tableWidth = ref(0)

const columnsWidths = computed(() => {
  const baseColumnsWidths = columns.map((col) => col.width ?? col.minWidth)
  const baseColumnsWidthsSum = baseColumnsWidths.reduce((sum, width) => sum + width, 0)
  const freeSpace = tableWidth.value - baseColumnsWidthsSum

  if (freeSpace > 0) {
    return columns.map((col) => {
      if (col.width) return col.width

      return col.minWidth + Math.floor((col.minWidth * freeSpace) / baseColumnsWidthsSum)
    })
  }

  return baseColumnsWidths
})

useResizeObserver(table, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  tableWidth.value = width
})

function handleCellMouseEvent(ctx: { row: Row; column: ColumnApi; event: MouseEvent }) {
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

function handleHeaderMouseEvent(ctx: { row: Row; column: ColumnApi; event: MouseEvent }) {
  if (!ctx.event.target) {
    return
  }

  switch (ctx.event.type) {
    case 'click': {
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
              class="s-table__th cursor-pointer py-12px sora-tpg-ch3"
              :class="[`s-table__th_align_${column.headerAlign}`]"
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
                  :class="{
                    's-table__sort-icon_asc': sortStates.get(column) === 'ascending',
                    's-table__sort-icon_desc': sortStates.get(column) === 'descending',
                  }"
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
            v-for="(row, rowIndex) in data"
            :key="JSON.stringify(row)"
            class="s-table__tr"
          >
            <td
              v-for="(column, columnIndex) in columns"
              :key="column.prop"
              class="s-table__td py-12px sora-tpg-p3"
              :class="[`s-table__td_align_${column.align}`]"
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
                :title="column.showOverflowTooltip ? row[column.prop] : null"
              >
                <component
                  :is="column.cellSlot"
                  v-if="column.cellSlot"
                  v-bind="{ row, column, rowIndex }"
                />
                <template v-else>
                  {{ row[column.prop] }}
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
