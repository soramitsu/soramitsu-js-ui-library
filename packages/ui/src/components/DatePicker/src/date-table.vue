<script setup lang="ts">
import {
  getFirstDayOfMonth,
  getDayCountOfMonth,
  getStartDateOfMonth,
  nextDate,
  clearTime as _clearTime,
} from './utils/date-util'

import * as types from '../types'
import { ComputedRef } from 'vue'

const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getDateTimestamp = (time: Date | number) => {
  if (typeof time === 'number' || typeof time === 'string') {
    return _clearTime(new Date(time)).getTime()
  } else if (time instanceof Date) {
    return _clearTime(time).getTime()
  } else {
    return NaN
  }
}
/* eslint-disable complexity */
/* eslint-disable complexity */

interface Props {
  firstDayOfWeek: number
  value: Date | Date[]
  time: boolean
  selectionMode: 'day' | 'range' | 'pick' | undefined
  showState: types.ShowState
  target: 'from' | 'to'
  stateStore: types.StateStore
}

const props = withDefaults(defineProps<Props>(), {
  selectionMode: 'range',
  firstDayOfWeek: 1,
  value: () => new Date(),
  target: 'from',
  time: true,
})

const isRange = computed(() => {
  return ['range'].includes(props.selectionMode)
})

const emit = defineEmits(['pick', 'updateShowedState'])

const offsetDay = computed(() => {
  const week = props.firstDayOfWeek
  return week > 3 ? 7 - week : -week
})
const WEEKS = computed(() => {
  const week = props.firstDayOfWeek
  return daysNames.concat(daysNames).slice(week, week + 7)
})
const year = computed(() => {
  return props.showState.year
})
const month = computed(() => {
  return props.showState.month
})
const startDate = computed(() => {
  return getStartDateOfMonth(year.value, month.value)
})

const timeDecoder = (num: number) => {
  return num.toString().length < 2 ? `0${num}` : num
}

const dateTableCells: ComputedRef<types.DateTableCell[]> = computed(() => {
  const cellsArray: types.DateTableCell[] = []
  const date = new Date(year.value, month.value, 1)
  let day = getFirstDayOfMonth(date) // day of first day
  const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth()) // days in current month
  const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth() === 0 ? 11 : date.getMonth() - 1) // days in prev month
  day = day === 0 ? 7 : day
  const offset = offsetDay.value
  let count = 1
  const now = getDateTimestamp(new Date())
  for (let i = 0; i < 42; i++) {
    const cell: types.DateTableCell = {
      type: 'normal',
      inRange: false,
      start: false,
      end: false,
      time: null,
      day: 0,
      month: 0,
      text: 0,
    }

    const index = i
    const time = nextDate(startDate.value, index - offset).getTime() // nextDate - день с которого начинается месяц
    cell.time = null

    if (isRange.value) {
      const minDate = props.stateStore.rangeState.startDate as Date
      const maxDate = props.stateStore.rangeState.endDate as Date
      cell.inRange = time >= getDateTimestamp(minDate) && time <= getDateTimestamp(maxDate)
      cell.start = minDate && time === getDateTimestamp(minDate)
      cell.end = maxDate && time === getDateTimestamp(maxDate)
      if (cell.start) {
        const hours = timeDecoder(minDate.getHours())
        const minutes = timeDecoder(minDate.getMinutes())
        cell.time = `${hours}:${minutes}`
      }
      if (cell.end) {
        const hours = timeDecoder(maxDate.getHours())
        const minutes = timeDecoder(maxDate.getMinutes())
        cell.time = `${hours}:${minutes}`
      }
    }
    if (props.selectionMode === 'day') {
      const selectedDate = props.stateStore.dayState
      cell.start = time === getDateTimestamp(selectedDate)
      if (cell.start) {
        const hours = timeDecoder(selectedDate.getHours())
        const minutes = timeDecoder(selectedDate.getMinutes())
        cell.time = `${hours}:${minutes}`
      }
    }
    if (props.selectionMode === 'pick') {
      const selectedDates = props.stateStore.pickState
      cell.start = selectedDates.some((item: Date) => {
        return getDateTimestamp(item) === getDateTimestamp(time)
      })
      if (cell.start) {
        const timeOfDay = selectedDates.find((item: Date) => getDateTimestamp(item) === getDateTimestamp(time))

        if (timeOfDay) {
          const hours = timeDecoder(timeOfDay.getHours())
          const minutes = timeDecoder(timeOfDay.getMinutes())
          cell.time = `${hours}:${minutes}`
        }
      }
    }

    const isToday = time === now
    if (isToday) {
      cell.type = 'today'
    }
    if (i >= 0 && i <= 13) {
      // кол-во дней предыдущего месяца, которое показывается
      const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset // day - первый день месяца (пнд-вск 0-6) offset - сдвиг, с чего начинается неделя,
      if (index >= numberOfDaysFromPreviousMonth) {
        cell.text = count++
        cell.month = month.value
      } else {
        cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - (index % 7)) + 1 + Math.floor(index / 7) // кол-во дней в пердыдущем месяце - () Math.floor(index/7)
        // cell.text = 'M'
        cell.month = month.value === 0 ? 11 : month.value - 1
        cell.type = 'prev-month'
      }
    } else {
      if (count <= dateCountOfMonth) {
        cell.text = count++
        cell.month = month.value
      } else {
        cell.text = count++ - dateCountOfMonth
        cell.type = 'next-month'
        cell.month = month.value === 11 ? 0 : month.value + 1
      }
    }
    cellsArray.push(cell)
  }
  return cellsArray
})

const cellMatchesDate = (cell: types.DateTableCell, date: Date) => {
  const value = new Date(date)
  return year.value === value.getFullYear() && month.value === value.getMonth() && Number(cell.text) === value.getDate()
}

const getCellClasses = (cell: types.DateTableCell) => {
  const selectionMode = props.selectionMode
  let classes = []
  if (cell.type === 'normal' || cell.type === 'today') {
    classes.push('available')
    if (cell.type === 'today') {
      classes.push('today')
    }
  } else {
    classes.push(cell.type)
  }
  if (
    selectionMode === 'day' &&
    (cell.type === 'normal' || cell.type === 'today') &&
    cellMatchesDate(cell, props.value as Date)
  ) {
    classes.push('current')
  }
  if (
    selectionMode === 'pick' &&
    (cell.type === 'normal' || cell.type === 'today') &&
    props.stateStore.pickState.some((item: Date) => cellMatchesDate(cell, item))
  ) {
    classes.push('start-date')
  }
  if (cell.inRange && (cell.type === 'normal' || cell.type === 'today')) {
    classes.push('in-range')
    if (cell.start) {
      classes.push('start-date')
    }
    if (cell.end) {
      classes.push('end-date')
    }
  }
  return classes.join(' ')
}

const handleClick = (ev: any) => {
  let target = ev.target
  if (target.tagName === 'SPAN') {
    target = target.parentNode
  }
  if (target.tagName !== 'DIV') return
  const idx = target.getAttribute('index')
  if (!idx) return
  const cell = dateTableCells.value[idx]
  const newDate = new Date(year.value, cell.month, cell.text)
  if (props.selectionMode === 'range') {
    if (!props.stateStore.rangeState.selecting) {
      emit('pick', {
        startDate: newDate,
        endDate: null,
        selecting: true,
        selectedField: 'startDate',
      })
    } else {
      const dat = props.stateStore.rangeState.startDate || props.stateStore.rangeState.endDate
      if (dat && newDate >= dat) {
        emit('pick', {
          startDate: dat,
          endDate: newDate,
          selecting: false,
          selectedField: 'endDate',
        })
      } else {
        emit('pick', {
          startDate: newDate,
          endDate: dat,
          selecting: false,
          selectedField: 'startDate',
        })
      }
    }
  } else if (props.selectionMode === 'day') {
    emit('pick', newDate)
  } else if (props.selectionMode === 'pick') {
    const currentArr = props.stateStore.pickState
    const dateSelected = currentArr.find((date: Date) => {
      return getDateTimestamp(date) === getDateTimestamp(newDate)
    })
    let newArr
    if (dateSelected) {
      newArr = currentArr.filter((date: Date) => getDateTimestamp(date) !== getDateTimestamp(newDate))
    } else {
      newArr = [...currentArr, newDate]
    }
    emit('pick', newArr)
  }

  if (cell.type === 'prev-month') {
    emit('updateShowedState', -1)
  }
  if (cell.type === 'next-month') {
    emit('updateShowedState', 1)
  }
}
</script>
<template>
  <div
    class="date-table sora-tpg-p4"
    @click="handleClick"
  >
    <div
      v-for="(day, key) in WEEKS"
      :key="key"
      class="date-table__title"
    >
      {{ day }}
    </div>
    <div
      v-for="(cell, idx) in dateTableCells"
      :key="idx"
      class="date-table__cell relative"
      :class="getCellClasses(cell)"
      :index="idx"
    >
      <span>{{ cell.text }}</span>
      <span
        v-if="props.time"
        v-show="cell.time"
        class="absolute date-time"
      >{{ cell.time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme';

.date-table {
  font-size: 12px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  row-gap: 8px;
  align-items: stretch;
  justify-content: center;

  &__cell {
    width: 45px;
    height: 30px;
    padding: 4px 0;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
    color: theme.token-as-var('sys.color.content-primary');
    font-feature-settings: 'tnum' on, 'lnum' on, 'case' on;

    & span {
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
      line-height: 24px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &.next-month,
    &.prev-month {
      color: theme.token-as-var('sys.color.content-primary');
      opacity: 0.4;
    }

    &.today {
      position: relative;
      color: theme.token-as-var('sys.color.primary');
      font-weight: 700;

      &.end-date span,
      &.start-date span {
        color: theme.token-as-var('sys.color.util.surface');
      }
    }

    &.available:hover:not(.start-date, .end-date, .current) {
      color: theme.token-as-var('sys.color.primary');
    }

    &.in-range {
      background-color: theme.token-as-var('sys.color.background');
      background-color: theme.token-as-var('sys.color.background-hover');
    }

    &.current:not(.disabled) {
      color: theme.token-as-var('sys.color.util.surface');
      background-color: theme.token-as-var('sys.color.primary');
      border-radius: 2px;
    }

    &.end-date,
    &.start-date {
      color: theme.token-as-var('sys.color.util.surface');
      background-color: theme.token-as-var('sys.color.primary');
      border-radius: 2px;
    }

    &.disabled {
      background-color: theme.token-as-var('sys.color.on-disabled');
      opacity: 1;
      cursor: not-allowed;
    }

    &.selected {
      background-color: theme.token-as-var('sys.color.primary');
      color: theme.token-as-var('sys.color.util.surface');
    }
  }

  &__title {
    padding: 4px;
    font-weight: 400;
    border-bottom: 1px solid theme.token-as-var('sys.color.border-primary');
    border-top: 1px solid theme.token-as-var('sys.color.border-primary');
    color: theme.token-as-var('sys.color.content-primary');
    text-align: center;
  }
}

.date-time {
  font-size: 7px;
  bottom: -7px;
  opacity: 0.8;
}
</style>
