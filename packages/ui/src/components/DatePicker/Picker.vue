<script lang="ts">
export default {
  name: 'SDatePicker',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import DateTable from './src/date-table.vue'
import MonthTable from './src/month-table.vue'
import MonthPanel from './month-panel.vue'
import YearTable from './src/year-table.vue'
import TimePanel from './time-panel.vue'
import { options } from './consts'

import { IconBasicCheckMark24, IconArrowsChevronBottom24 } from '@/components/icons'
import { maska as vMaska } from 'maska'
import { DateTime } from 'luxon'
import Popper from 'vue3-popper'

import {
  DatePickerType,
  RangeState,
  DateState,
  PickState,
  StateStore,
  Options,
  PresetOption,
  ShowState,
  RangeOptionValue,
} from './types'

interface Props {
  modelValue: Date[] | Date
  type: DatePickerType
  time: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'day',
  time: false,
})

const emit = defineEmits(['update:modelValue'])

const gridType = computed(() => {
  const time = props.time ? 'time' : ''
  const range = props.type === 'range' ? '--range' : ''
  const pick = props.type === 'pick' ? '--pick' : ''
  return `custom-grid--date${time}${range || pick || ''}`
})

const isRange = computed(() => {
  return props.type === 'range'
})

const formatPattern = computed(() => {
  return props.time ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy'
})

// ____STATE_STORE________________________________________________________________

const today = new Date()

const rangeState = ref<RangeState>({
  selecting: false,
  startDate: new Date(today.getFullYear(), today.getMonth(), 1) || null,
  endDate: new Date(today.getFullYear(), today.getMonth(), 7) || null,
})

const dayState = ref<DateState>(new Date())
const pickState = ref<PickState>([])

const stateStore = computed<StateStore>(() => {
  return {
    dayState: dayState.value,
    pickState: pickState.value,
    rangeState: rangeState.value,
  }
})

const updateModelValue = () => {
  console.log('updateModelValue')
  if (props.type === 'day') {
    emit('update:modelValue', dayState.value)
  } else if (props.type === 'pick') {
    emit('update:modelValue', pickState.value)
  } else {
    emit('update:modelValue', [rangeState.value.startDate, rangeState.value.endDate])
  }
}

const onDatePick = (data: RangeOptionValue | Date | Date[]) => {
  if (props.type === 'day') {
    dayState.value = data as Date
    emit('update:modelValue', dayState.value)
  } else if (props.type === 'pick') {
    pickState.value = data as Date[]
    emit('update:modelValue', pickState.value)
    setDateForTimeFieldName(pickState.value.length - 1)
  } else {
    let rsData = data as RangeOptionValue
    rangeState.value = { startDate: rsData.startDate, endDate: rsData.endDate, selecting: rsData.selecting }
    setDateForTimeFieldName(rsData.selectedField)
  }
  updateModelValue()
  menuState.value = 'Custom'
}

updateModelValue()

// __________________________________________________________________________________

const onMenuClick = (data: Date | RangeOptionValue, label: string) => {
  onDatePick(data)
  updateShowedMonths()
  menuState.value = label
}

const menuState = ref<string>('')

// ____SHOW_STATE____________________________________________________________________

const updateShowedMonths = () => {
  let date: Date | null = null
  switch (props.type) {
    case 'pick':
      date = pickState.value[pickState.value.length - 1]
      break
    case 'day':
      date = dayState.value
      break
    case 'range':
      date = rangeState.value[dateForTime.value as keyof RangeState] as Date | null
      // date = getKeyValue<keyof RangeState, RangeState>(dateForTime.value)(rangeState.value)
      break
    default:
  }
  if (!date) return `00:00`
  updateShowedMonth(date.getMonth())
  updateShowedYear(date.getFullYear())
}

const showState = ref<ShowState>({
  month: 0,
  year: 0,
})

showState.value.month = today.getMonth()
showState.value.year = today.getFullYear()

const updateShowedState = (deltaMonth: number) => {
  let newMonth = showState.value.month + deltaMonth
  if (newMonth > 11) {
    updateShowedMonth(0)
    updateShowedYear(showState.value.year + 1)
  } else if (newMonth < 0) {
    updateShowedMonth(11)
    updateShowedYear(showState.value.year - 1)
  } else {
    updateShowedMonth(newMonth)
  }
  return
}

const updateShowedMonth = (month: number) => {
  showState.value.month = month
  changeView('dates')
}

const updateShowedYear = (year: number) => {
  showState.value.year = year
  changeView('dates')
}

const nextMonthShowState = computed(() => {
  const month = showState.value.month > 10 ? 0 : showState.value.month + 1
  const year = month === 0 ? showState.value.year + 1 : showState.value.year
  return {
    month,
    year,
  }
})

const showStateView = computed(() => {
  return ['years', 'months'].includes(currentView.value)
})

// watch(props.modelValue, ()=> {
//   updateShowedMonths()
// }, {deep: true})

// _____________________________________________________________________________

// _______________________________________VIEW__________________________________________

const OPTIONS: PresetOption[] = options[props.type as keyof Options] || []

const currentView = ref('dates')

const changeView = (viewName: string) => {
  currentView.value = viewName
}

// _____________________________________________________________________________

// _______________________________________TIME__________________________________________

const dateForTime = ref<string>('')

const setDateForTimeFieldName = (field: string | Number) => {
  dateForTime.value = `${field}`
}

const updateTime = (time: string) => {
  const arr = time.split(':').map((item) => Number(item))
  console.log(time)
  let date
  switch (props.type) {
    case 'pick':
      date = pickState.value[dateForTime.value as keyof PickState] as Date | null
      if (!date) return
      pickState.value[dateForTime.value as keyof PickState] = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        arr[0],
        arr[1],
        0,
      )
      break
    case 'day':
      date = dayState.value
      dayState.value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), arr[0], arr[1], 0)
      break
    case 'range':
      date = rangeState.value[dateForTime.value as keyof RangeState] as Date | null
      if (!date) return
      rangeState.value[dateForTime.value as keyof RangeState] = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        arr[0],
        arr[1],
        0,
      )
      break
    default:
  }

  updateModelValue()
}

const currentValueTime = computed(() => {
  if (!dateForTime.value && props.type !== 'day') return `00:00`
  let date
  switch (props.type) {
    case 'pick':
      date = pickState.value[pickState.value.length - 1]
      break
    case 'day':
      date = dayState.value
      break
    case 'range':
      date = rangeState.value[dateForTime.value as keyof RangeState] as Date | null
      break
    default:
  }
  if (!date) return `00:00`
  const hours = timeDecoder(date.getHours())
  const minutes = timeDecoder(date.getMinutes())
  return `${hours}:${minutes}`
})

const timeDecoder = (num: number) => {
  return num.toString().length < 2 ? `0${num}` : num
}

// _______________________________________________________________________________________

const firstCalendarModelValue = computed(() => {
  // return isRange.value ? props.modelValue[0] : props.modelValue
  if (props.type === 'range') {
    const modelValue = props.modelValue as Date[]
    return modelValue[0]
  } else {
    return props.modelValue
  }
})

const calendarToModelValue = computed(() => {
  return props.modelValue as Date[][1]
})

const customInputValue = (field: string) => {
  return formatDate(rangeState.value[field as keyof RangeState])
}

const updateCustomInput = (event: any, field: string) => {
  const newVal = event.target.value
  const date = fromFormat(newVal)
  if (date) rangeState.value[field as keyof RangeState] = date
  rangeState.value.selecting = false
  updateModelValue()
  updateShowedMonths()
}

const updateCustomInputDay = (event: any) => {
  const newVal = event.target.value
  const date = fromFormat(newVal)
  if (date) dayState.value = date
  updateModelValue()
  updateShowedMonths()
}

const customInputValueStartDate = computed(() => {
  return customInputValue('startDate')
})

const customInputValueEndDate = computed(() => {
  return customInputValue('endDate')
})

const customInputValueDay = computed(() => {
  return formatDate(dayState.value)
})

const customInputConfig = computed(() => {
  return {
    mask: `##/##/####${props.time ? ', ##:##' : ''}`,
    class: `custom-input${props.time ? '--time' : ''}`,
  }
})

const formatDate = (date: any) => {
  if (!date) return ''
  return DateTime.fromJSDate(date).toFormat(formatPattern.value)
}

const fromFormat = (dateString: string) => {
  let date = DateTime.fromFormat(dateString, formatPattern.value)
  if (!date.isValid) return null
  console.dir(date)
  return date.toJSDate()
}

const headTitle = computed(() => {
  try {
    switch (props.type) {
      case 'day':
        return formatDate(props.modelValue)
      case 'range': {
        const modelValue = props.modelValue as Date[]
        return modelValue.map((item: Date) => formatDate(item)).join(' - ')
      }

      case 'pick': {
        const modelValue = props.modelValue as Date[]
        return modelValue.map((item: Date) => formatDate(item)).join(', ')
      }
      default:
        break
    }
  } catch {
    return ''
  }
})

const arrowState = ref<string>('')
const switchArrow = (newArrowState: string) => {
  arrowState.value = newArrowState
}
</script>

<template>
  <div>
    <Popper
      @open:popper="switchArrow('reverse')"
      @close:popper="switchArrow('')"
    >
      <div class="p-2 sora-tpg-ch2 relative pr-6 cursor-pointer title">
        {{ headTitle || 'Date' }}
        <div
          class="arrow"
          :class="arrowState"
        >
          <IconArrowsChevronBottom24 />
        </div>
      </div>
      <template #content="{ close }">
        <div
          class="custom-grid sora-tpg-p4"
          :class="[`${gridType}`, { narrow: showStateView }]"
        >
          <div class="select flex flex-col justify-start items-stretch sora-tpg-p3">
            <p
              v-for="(item, idx) in OPTIONS"
              :key="idx"
              class="menu-item"
              :class="menuState === item.label ? 'active' : ''"
              @click="onMenuClick(item.value, item.label)"
            >
              {{ item.label }}
              <span
                v-show="menuState === item.label"
                class="menu-item__checkmark"
              ><IconBasicCheckMark24 /></span>
            </p>
          </div>
          <div class="calendars flex justify-center items-start">
            <div class="calendar calendar-from">
              <div
                v-show="currentView === 'dates'"
                class="flex flex-col justify-start items-center"
              >
                <MonthPanel
                  class="w-full"
                  :show-month="showState.month"
                  :show-year="showState.year"
                  @change-view="changeView"
                  @update-showed-state="updateShowedState"
                />
                <DateTable
                  :value="firstCalendarModelValue"
                  :time="props.time"
                  :selection-mode="type"
                  :show-state="showState"
                  :state-store="stateStore"
                  @pick="onDatePick"
                  @update-showed-state="updateShowedState"
                />
              </div>
            </div>
            <div
              v-if="isRange"
              class="calendar calendar-to"
            >
              <div
                v-show="currentView === 'dates'"
                class="flex flex-col justify-start items-center"
              >
                <MonthPanel
                  class="w-full"
                  :show-month="nextMonthShowState.month"
                  :show-year="nextMonthShowState.year"
                  :hide-arrows="true"
                  @update-showed-state="updateShowedState"
                  @change-view="changeView"
                />
                <DateTable
                  :value="calendarToModelValue"
                  :time="props.time"
                  :selection-mode="type"
                  :show-state="nextMonthShowState"
                  :state-store="stateStore"
                  @pick="onDatePick"
                  @update-showed-state="updateShowedState"
                />
              </div>
            </div>
            <div
              v-if="currentView === 'months'"
              class="h-full w-full flex items-start justify-center"
            >
              <MonthTable
                :show-state="showState"
                @pick="updateShowedMonth"
                @update-showed-year="updateShowedYear"
              />
            </div>
            <div v-if="currentView === 'years'">
              <YearTable
                :value="showState.year"
                @pick="updateShowedYear"
              />
            </div>
          </div>
          <div
            v-if="time && !showStateView"
            class="time flex flex-col justify-center"
          >
            <TimePanel
              :value="currentValueTime"
              @update-time="updateTime"
            />
          </div>
          <div
            v-if="menuState === 'Custom' && !showStateView"
            class="custom-panel flex justify-center items-center relative"
          >
            <div class="flex justify-center items-center">
              <template v-if="props.type === 'range'">
                <input
                  v-maska="customInputConfig.mask"
                  class="custom-input"
                  :class="customInputConfig.class"
                  :value="customInputValueStartDate"
                  @change="updateCustomInput($event, 'startDate')"
                >
                <div class="mx-2">
                  -
                </div>
                <input
                  v-maska="customInputConfig.mask"
                  class="custom-input"
                  :class="customInputConfig.class"
                  :value="customInputValueEndDate"
                  @change="updateCustomInput($event, 'endDate')"
                >
              </template>
              <template v-if="props.type === 'day'">
                <input
                  v-maska="customInputConfig.mask"
                  class="custom-input"
                  :class="customInputConfig.class"
                  :value="customInputValueDay"
                  @change="updateCustomInputDay($event)"
                >
              </template>
              <button
                class="save-button"
                @click="close"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </template>
    </Popper>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme';

.arrow {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scale(0.66);
}
.arrow svg {
  transition: 0.3s;
}

.arrow.reverse svg {
  transform: rotate(180deg);
}

.custom-grid {
  display: grid;
  background-color: theme.token-as-var('sys.color.util.surface');

  grid-template-areas:
    'select calendars time'
    'select custom custom';
  max-height: 405px;

  &.narrow {
    // width: 640px;
  }

  box-shadow: theme.token-as-var('sys.shadow.dropdown');

  &--date {
    grid-template-areas:
      'select calendars'
      'select custom';
  }
  &--date--range {
    grid-template-areas:
      'select calendars'
      'select custom';
  }

  &--datetime {
    grid-template-areas:
      'select calendars  time'
      'select custom custom';
  }

  &--datetime--pick {
    grid-template-areas:
      'calendars time'
      'custom custom';
  }

  &--date--pick {
    grid-template-areas:
      'calendars'
      'custom';
  }
}

.select {
  grid-area: select;
  border-right: 1px solid theme.token-as-var('sys.color.border-primary');
  width: 150px;
}
.calendar-to {
  margin-left: 16px;
}
.time {
  grid-area: time;
  max-height: 342px;
}
.custom-panel {
  grid-area: custom;
  border-top: 1px solid theme.token-as-var('sys.color.border-primary');
  height: 52px;
}

.calendars {
  grid-area: calendars;
  margin: 0 16px;
}

.menu-item {
  padding: 10px 16px;
  cursor: pointer;
  position: relative;
  &__checkmark {
    position: absolute;
    top: 0;
    right: 8px;
    transform: translateY(50%);
  }
}

.menu-item:hover {
  background-color: theme.token-as-var('sys.color.background-hover');
}
.menu-item.active {
  background-color: theme.token-as-var('sys.color.background-hover');
}

.custom-input {
  outline: none;
  border: 1px solid theme.token-as-var('sys.color.border-primary');
  border-radius: 4px;
  padding: 5px 10px;
  width: 120px;
  height: 32px;
  text-align: center;

  &--time {
    width: 150px;
  }
}

.save-button {
  font-size: 10px;
  width: 44px;
  height: 24px;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  background: theme.token-as-var('sys.color.primary');
  border-radius: 2px;
  color: theme.token-as-var('sys.color.util.surface');
  font-weight: 700;
}

.title {
  border-radius: 4px;
  border: 1px solid theme.token-as-var('sys.color.border-primary');
}
</style>
