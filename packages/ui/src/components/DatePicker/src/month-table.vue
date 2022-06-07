<script lang="ts">
export default {
  name: 'MonthTable',
}
</script>

<script setup lang="ts">
import { ComputedRef } from 'vue'

interface Props {
  value: number
}

interface MonthCellStyle {
  current: boolean
  today: boolean
}

interface MonthCell {
  type: 'normal'
  title: string
  text: number
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['changerange', 'pick', 'updateRangeStateSel'])

const months = ref(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'])
const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const getCellStyle = (cell: MonthCell) => {
  const style: MonthCellStyle = {
    current: false,
    today: false,
  }
  const today = new Date()
  const month = cell.text

  style.current = props.value === month
  style.today = today.getMonth() === month
  return style
}
const handleMonthTableClick = (event: any) => {
  let target = event.target
  const month = Number(target.getAttribute('month'))
  emit('pick', month)
}

const gridCells: ComputedRef<MonthCell[]> = computed(() => {
  return monthsFull.map((monthName, idx) => {
    const cell: MonthCell = { type: 'normal', title: monthName, text: idx }
    return cell
  })
})
</script>

<template>
  <div
    class="month-table sora-tpg-p3"
    @click="handleMonthTableClick"
  >
    <div
      v-for="(cell, idx) in gridCells"
      :key="idx"
      :class="getCellStyle(cell)"
    >
      <div>
        <a
          class="cell"
          :month="cell.text"
        >{{ `${monthsFull[cell.text]}` }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme';

.month-table {
  margin: -1px;
  border-collapse: collapse;
  width: 320px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);

  & > div {
    text-align: center;
    padding: 8px 0;
    cursor: pointer;

    & div {
      height: 48px;
      padding: 6px 0;
      box-sizing: border-box;
    }

    &.today {
      & .end-date .cell,
      &.start-date .cell {
        color: theme.token-as-var('sys.color.util.surface');
      }
    }

    &.in-range {
      & div,
      & div:hover {
        background-color: theme.token-as-var('sys.color.background');
      }
    }

    &.end-date div,
    &.start-date div {
      color: theme.token-as-var('sys.color.util.surface');

      & .cell {
        color: theme.token-as-var('sys.color.util.surface');
        background-color: theme.token-as-var('sys.color.primary');
      }
    }

    &.start-date div {
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
    }

    &.end-date div {
      border-top-right-radius: 24px;
      border-bottom-right-radius: 24px;
    }

    &.current:not(.disabled) .cell {
      color: theme.token-as-var('sys.color.primary');
    }

    &.disabled .cell {
      background-color: theme.token-as-var('sys.color.on-disabled');
      cursor: not-allowed;
    }

    &.today .cell {
      color: theme.token-as-var('sys.color.primary');
      font-weight: 700;
    }

    & .cell {
      display: block;
      line-height: 36px;
      color: theme.token-as-var('sys.color.content-primary');
      margin: 0 auto;
      border-radius: 18px;

      &:hover {
        color: theme.token-as-var('sys.color.primary');
      }
    }
  }
}
</style>
