<script lang="ts">
export default {
  name: 'DatePanel',
}
</script>

<script setup lang="ts">
import MonthPanel from './month-panel.vue'
import DateTable from './src/date-table.vue'

import { DatePickerType, StateStore, ShowState } from './types'

interface Props {
  showState: ShowState
  hideArrows: boolean
  value: Date | Date[]
  time: boolean
  selectionMode: DatePickerType
  stateStore: StateStore
}

const props = withDefaults(defineProps<Props>(), {
  hideArrows: false,
  time: false,
})

const emit = defineEmits(['updateShowedState', 'changeView', 'pick'])

const updateShowedState = (deltaMonth: number) => {
  emit('updateShowedState', deltaMonth)
}

const changeView = (viewName: string) => {
  emit('changeView', viewName)
}

const onDatePick = (data: any) => {
  emit('pick', data)
}
</script>

<template>
  <div class="flex flex-col justify-start items-center">
    <MonthPanel
      class="w-full"
      :show-month="showState.month"
      :show-year="showState.year"
      :hide-arrows="hideArrows"
      @update-showed-state="updateShowedState"
      @change-view="changeView"
    />
    <DateTable
      :value="value"
      :time="props.time"
      :selection-mode="selectionMode"
      :show-state="showState"
      :state-store="stateStore"
      @pick="onDatePick"
      @update-showed-state="updateShowedState"
    />
  </div>
</template>

<style lang="scss" scoped></style>
