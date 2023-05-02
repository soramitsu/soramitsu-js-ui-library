<script setup lang="ts">
import MonthTable from './SDatePickerTableMonths.vue'
import YearTable from './SDatePickerTableYears.vue'
import DatePanel from './SDatePickerPanelDate.vue'

import type { StateStore, ShowState, ModelValueType } from './types'
import { type DatePickerApi, useDatePickerApi } from './api'

type Props = {
  currentView: string
  showState: ShowState
  stateStore: StateStore
  modelValue: ModelValueType
}

const props = defineProps<Props>()

const state: DatePickerApi = useDatePickerApi()

const emit = defineEmits(['update:showed-state', 'change-view', 'pick'])

const hoveredDate = ref<Date>(new Date())

const isRange = computed(() => {
  return state.type === 'range'
})

const firstCalendarModelValue = computed(() => {
  if (!props.modelValue) return new Date()

  if (state.type === 'range') {
    const modelValue = props.modelValue as [Date, ...Date[]]
    return modelValue[0]
  } else {
    return props.modelValue
  }
})

const calendarToModelValue = computed(() => {
  if (!props.modelValue) return new Date()
  return props.modelValue as Date[][1]
})

const nextMonthShowState = computed(() => {
  const month = props.showState.month > 10 ? 0 : props.showState.month + 1
  const year = month === 0 ? props.showState.year + 1 : props.showState.year
  return {
    month,
    year,
  }
})

const changeView = (viewName: string) => {
  emit('change-view', viewName)
}

const onDatePick = (data: any) => {
  emit('pick', data)
}

const updateShowedState = (deltaMonth: number) => {
  let newMonth = props.showState.month + deltaMonth
  if (newMonth > 11) {
    emit('update:showed-state', 0, props.showState.year + 1)
  } else if (newMonth < 0) {
    emit('update:showed-state', 11, props.showState.year - 1)
  } else {
    emit('update:showed-state', newMonth)
  }
  return
}

const updateShowedMonth = (month: number) => {
  emit('update:showed-state', month)
}

const updateShowedYear = (year: number) => {
  emit('update:showed-state', undefined, year)
}

const updateHoveredDate = (date: Date) => {
  hoveredDate.value = date
}
</script>

<template>
  <div class="s-date-picker-calendars-panel">
    <div>
      <DatePanel
        v-show="currentView === 'dates'"
        :show-state="showState"
        :value="firstCalendarModelValue"
        :state-store="stateStore"
        :hovered-date="hoveredDate"
        @change-view="changeView"
        @update:showed-state="updateShowedState"
        @pick="onDatePick"
        @update:hovered-date="updateHoveredDate"
      />
    </div>
    <div
      v-if="isRange"
      class="ml-4"
    >
      <DatePanel
        v-show="currentView === 'dates'"
        :show-state="nextMonthShowState"
        :value="calendarToModelValue"
        :state-store="stateStore"
        :hovered-date="hoveredDate"
        @change-view="changeView"
        @update:showed-state="updateShowedState"
        @pick="onDatePick"
        @update:hovered-date="updateHoveredDate"
      />
    </div>
    <div
      v-if="currentView === 'months'"
      class="h-full w-full flex items-start justify-center"
    >
      <MonthTable
        :show-state="showState"
        @pick="updateShowedMonth"
        @update:showed-year="updateShowedYear"
      />
    </div>
    <div v-if="currentView === 'years'">
      <YearTable
        :value="showState.year"
        @pick="updateShowedYear"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-date-picker-calendars-panel {
  @apply flex justify-center items-start;
  grid-area: calendars;
  margin: 0 16px;
  margin-bottom: 16px;
}
</style>
