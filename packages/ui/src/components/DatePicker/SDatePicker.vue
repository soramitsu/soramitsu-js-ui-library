<script setup lang="ts">
import MonthTable from './src/month-table.vue'
import DatePanel from './date-panel.vue'
import YearTable from './src/year-table.vue'
import TimePanel from './time-panel.vue'
import { options } from './presets'

import { IconBasicCheckMark24, IconArrowsChevronBottom24 } from '@/components/icons'
import { maska as vMaska } from 'maska'
import { DateTime } from 'luxon'
import { SPopover, SPopoverWrappedTransition } from '@/components/Popover'
import { and } from '@vueuse/core'

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
  disabled: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'day',
  time: false,
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

const isRange = computed(() => {
  return props.type === 'range'
})

// #region STATE_STORE

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

const init = () => {
  if (props.type === 'day') {
    dayState.value = props.modelValue as DateState
  } else if (props.type === 'pick') {
    pickState.value = props.modelValue as PickState
  } else {
    rangeState.value.startDate = (props.modelValue as Date[])[0]
    rangeState.value.endDate = (props.modelValue as Date[])[1]
  }
  updateShowedMonths()
}

const updateModelValue = () => {
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

// #endregion

// #region SHOW_STATE

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

// #endregion

// #region OPTIONS_PANEL
const onMenuClick = (data: Date | RangeOptionValue, label: string) => {
  onDatePick(data)
  updateShowedMonths()
  menuState.value = label
}

const menuState = ref<string>('')

const OPTIONS: PresetOption[] = options[props.type as keyof Options] || []

// #endregion

// #region VISUAL

const gridType = computed(() => {
  const time = props.time ? 'time' : ''
  const range = props.type === 'range' ? '-range' : ''
  const pick = props.type === 'pick' ? '-pick' : ''
  return `date-picker_date${time}${range || pick || ''}`
})

const currentView = ref('dates')

const changeView = (viewName: string) => {
  currentView.value = viewName
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

const arrowState = computed(() => {
  return showPopper.value ? 'reverse' : ''
})

// #endregion

// #region TIME

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
      ;(pickState as any).value[dateForTime.value as keyof PickState] = new Date(
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
      ;(rangeState as any).value[dateForTime.value as keyof RangeState] = new Date(
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

// #endregion

// #region CALENDARS_PANEL
const firstCalendarModelValue = computed(() => {
  if (!props.modelValue) return new Date()
  if (props.type === 'range') {
    const modelValue = props.modelValue as Date[]
    return modelValue[0]
  } else {
    return props.modelValue
  }
})

const calendarToModelValue = computed(() => {
  if (!props.modelValue) return new Date()
  return props.modelValue as Date[][1]
})

// #endregion

// #region CUSTOM_PANEL

const customInputValue = (field: string) => {
  return formatDate(rangeState.value[field as keyof RangeState])
}

const updateCustomInput = (event: any, field: string) => {
  const newVal = event.target.value
  const date = fromFormat(newVal)
  if (date) (rangeState as any).value[field as keyof RangeState] = date
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

const updateCustomInputPick = (event: any) => {
  const newVal = event.target.value
  const date = fromFormat(newVal)
  if (date) {
    if (pickState.value.length > 0) pickState.value[pickState.value.length - 1] = date
    else pickState.value.push(date)
  }
  updateModelValue()
  updateShowedMonths()
}

const customInputValuePick = computed(() => {
  return formatDate(pickState.value[pickState.value.length - 1])
})

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
    class: `custom-panel__input${props.time ? '_time' : ''}`,
  }
})

// #endregion

// #region FORMATTING

const formatPattern = computed(() => {
  return props.time ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy'
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

// #endregion

// #region POPPER
const [showPopper, togglePopper] = useToggle(false)
whenever(and(props.disabled, showPopper), () => togglePopper(false), { immediate: true })

const updateShow = () => {
  if (!props.disabled) togglePopper(true)
}
// #endregion

if (props.modelValue || (props.modelValue as Date[])?.length > 0) init()
else updateModelValue()
</script>

<template>
  <div class="date-picker-component">
    <SPopover
      v-model:show="showPopper"
      placement="bottom-start"
      trigger="manual"
      distance="4"
      @click-outside="togglePopper(false)"
    >
      <template #trigger>
        <div
          class="head-title p-2 sora-tpg-ch2 relative pr-6"
          :class="disabled ? 'cursor-default' : 'cursor-pointer'"
          @keydown="updateShow"
          @click="updateShow"
        >
          {{ headTitle || 'Date' }}
          <div
            class="head-title__arrow"
            :class="arrowState"
          >
            <IconArrowsChevronBottom24 />
          </div>
        </div>
      </template>
      <template #popper>
        <SPopoverWrappedTransition
          name="s-select-dropdown-transition"
          eager
        >
          <div
            class="date-picker sora-tpg-p4"
            data-testid="date-picker"
            :class="[`${gridType}`, { 'narrow': showStateView }]"
          >
            <div
              v-if="props.type != 'pick'"
              class="options-panel sora-tpg-p3"
            >
              <p
                v-for="(item, idx) in OPTIONS"
                :key="idx"
                class="options-panel__item"
                :class="menuState === item.label ? 'active' : ''"
                @click="onMenuClick(item.value, item.label)"
                @keydown="onMenuClick(item.value, item.label)"
              >
                {{ item.label }}
                <span
                  v-show="menuState === item.label"
                  class="options-panel__checkmark"
                ><IconBasicCheckMark24 /></span>
              </p>
            </div>
            <div class="calendars-panel">
              <div>
                <DatePanel
                  v-show="currentView === 'dates'"
                  :show-state="showState"
                  :value="firstCalendarModelValue"
                  :time="props.time"
                  :selection-mode="type"
                  :state-store="stateStore"
                  @change-view="changeView"
                  @update-showed-state="updateShowedState"
                  @pick="onDatePick"
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
                  :time="props.time"
                  :selection-mode="type"
                  :state-store="stateStore"
                  :hide-arrows="true"
                  @change-view="changeView"
                  @update-showed-state="updateShowedState"
                  @pick="onDatePick"
                />
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
              class="time-panel"
            >
              <TimePanel
                :value="currentValueTime"
                @update-time="updateTime"
              />
            </div>
            <div
              v-if="menuState === 'Custom' && !showStateView"
              class="custom-panel"
            >
              <div class="flex justify-center items-center">
                <template v-if="props.type === 'range'">
                  <input
                    v-maska="customInputConfig.mask"
                    class="custom-panel__input"
                    :class="customInputConfig.class"
                    :value="customInputValueStartDate"
                    @change="updateCustomInput($event, 'startDate')"
                  >
                  <div class="mx-2">
                    -
                  </div>
                  <input
                    v-maska="customInputConfig.mask"
                    class="custom-panel__input"
                    :class="customInputConfig.class"
                    :value="customInputValueEndDate"
                    @change="updateCustomInput($event, 'endDate')"
                  >
                </template>
                <template v-if="props.type === 'day'">
                  <input
                    v-maska="customInputConfig.mask"
                    class="custom-panel__input"
                    :class="customInputConfig.class"
                    :value="customInputValueDay"
                    @change="updateCustomInputDay($event)"
                  >
                </template>
                <template v-if="props.type === 'pick' && pickState.length > 0">
                  <input
                    v-maska="customInputConfig.mask"
                    class="custom-panel__input"
                    :class="customInputConfig.class"
                    :value="customInputValuePick"
                    @change="updateCustomInputPick($event)"
                  >
                </template>
                <button
                  class="save-button"
                  @click="togglePopper(false)"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </SPopoverWrappedTransition>
      </template>
    </SPopover>
  </div>
</template>

<style lang="scss">
@use '@/theme';

.date-picker-component {
  .head-title {
    border-radius: 4px;
    border: 1px solid theme.token-as-var('sys.color.border-primary');

    &__arrow {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%) scale(0.66);

      & svg {
        transition: 0.3s;
      }

      &.reverse svg {
        transform: rotate(180deg);
      }
    }
  }

  .date-picker {
    display: grid;
    background-color: theme.token-as-var('sys.color.util.surface');

    grid-template-areas:
      'options calendars time'
      'options custom custom';
    max-height: 405px;
    border-radius: 4px;
    box-shadow: theme.token-as-var('sys.shadow.dropdown');

    &_date {
      grid-template-areas:
        'options calendars'
        'options custom';
    }
    &_date-range {
      grid-template-areas:
        'options calendars'
        'options custom';
    }

    &_datetime {
      grid-template-areas:
        'options calendars  time'
        'options custom custom';
    }

    &_datetime-pick {
      grid-template-areas:
        'calendars time'
        'custom custom';
    }

    &_date-pick {
      grid-template-areas:
        'calendars'
        'custom';
    }

    .options-panel {
      @apply flex flex-col justify-start;
      grid-area: options;
      border-right: 1px solid theme.token-as-var('sys.color.border-primary');

      &__item {
        padding: 10px 16px;
        cursor: pointer;
        position: relative;
        width: 150px;
        &:hover {
          background-color: theme.token-as-var('sys.color.background-hover');
        }
        &.active {
          background-color: theme.token-as-var('sys.color.background-hover');
        }
      }

      &__checkmark {
        position: absolute;
        top: 0;
        right: 8px;
        transform: translateY(50%);
      }
    }

    .calendars-panel {
      @apply flex justify-center items-start;
      grid-area: calendars;
      margin: 0 16px;
      margin-bottom: 16px;
    }
    .time-panel {
      @apply flex flex-col justify-start;
      grid-area: time;
      max-height: 342px;
    }
    .custom-panel {
      @apply flex justify-center items-center relative;
      grid-area: custom;
      border-top: 1px solid theme.token-as-var('sys.color.border-primary');
      height: 52px;

      &__input {
        outline: none;
        border: 1px solid theme.token-as-var('sys.color.border-primary');
        border-radius: 4px;
        padding: 5px 10px;
        width: 120px;
        height: 32px;
        text-align: center;

        &_time {
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
    }
  }
}
</style>
