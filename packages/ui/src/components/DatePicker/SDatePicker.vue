<script setup lang="ts">
import TimePanel from './SDatePickerPanelTime.vue'
import OptionsPanel from './SDatePickerPanelOptions.vue'
import CalendarsPanel from './SDatePickerPanelCalendars.vue'
import CustomPanel from './SDatePickerPanelCustom.vue'

import { IconArrowsChevronBottom24 } from '@/components/icons'
import { SPopover, SPopoverWrappedTransition } from '@/components/Popover'
import { and } from '@vueuse/math'
import { format } from 'date-fns'

import {
  DatePickerType,
  RangeState,
  DateState,
  PickState,
  StateStore,
  ShowState,
  RangeOptionValue,
  ModelValueType,
  DatePickerOptions,
} from './types'
import { DatePickerApi, DATE_PICKER_API_KEY } from './api'
import { DEFAULT_SHORTCUTS } from './consts'

type Props = {
  modelValue: ModelValueType
  type?: DatePickerType
  time?: boolean
  disabled?: boolean
  shortcuts?: DatePickerOptions
}
const props = withDefaults(defineProps<Props>(), {
  type: 'day',
  time: false,
  disabled: false,
  shortcuts: () => DEFAULT_SHORTCUTS,
})

const innerModelValue = ref<ModelValueType>(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const datePickerConfig: DatePickerApi = reactive({
  type: props.type,
  time: props.time,
  disabled: props.disabled,
})

provide(DATE_PICKER_API_KEY, datePickerConfig)

// #region STATE_STORE

const today = new Date()

const rangeStateRef = ref<RangeState>({
  selecting: false,
  startDate: new Date(today.getFullYear(), today.getMonth(), 1),
  endDate: new Date(today.getFullYear(), today.getMonth(), 7),
})

const rangeState = toReactive(rangeStateRef)

const dayState = ref<DateState>(new Date())
const pickState = ref<PickState>([])

const stateStore = computed<StateStore>(() => {
  return {
    dayState: dayState.value,
    pickState: pickState.value,
    rangeState: rangeState,
  }
})

const init = () => {
  if (props.type === 'day') {
    dayState.value = innerModelValue.value as DateState
  } else if (props.type === 'pick') {
    pickState.value = innerModelValue.value as PickState
  } else {
    rangeStateRef.value.startDate = (innerModelValue.value as Date[])[0]
    rangeStateRef.value.endDate = (innerModelValue.value as Date[])[1]
  }
  updateShowedMonths()
}

const updateModelValue = () => {
  if (props.type === 'day') {
    innerModelValue.value = dayState.value
    save()
  } else if (props.type === 'pick') {
    innerModelValue.value = pickState.value
    save()
  } else {
    innerModelValue.value = [rangeState.startDate as Date, rangeState.endDate as Date]

    if (rangeState.endDate) {
      save()
    }
  }
}

const onDatePick = (data: RangeOptionValue | Date | Date[]) => {
  if (props.type === 'day') {
    dayState.value = data as Date
    innerModelValue.value = dayState.value
  } else if (props.type === 'pick') {
    pickState.value = data as Date[]
    innerModelValue.value = pickState.value
    setDateForTimeFieldName(pickState.value.length - 1)
  } else {
    let rsData = data as RangeOptionValue
    rangeStateRef.value = { startDate: rsData.startDate, endDate: rsData.endDate, selecting: rsData.selecting }
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
      date = rangeState[dateForTime.value as keyof RangeState] as Date | null
      break
    default:
  }
  if (!date) return `00:00`
  updateShowedState(date.getMonth(), date.getFullYear())
}

const showState = ref<ShowState>({
  month: 0,
  year: 0,
})

showState.value.month = today.getMonth()
showState.value.year = today.getFullYear()

const updateShowedState = (month?: number, year?: number) => {
  showState.value.year = year ?? showState.value.year
  showState.value.month = month ?? showState.value.month
  changeView('dates')
}

const showStateView = computed(() => {
  return ['years', 'months'].includes(currentView.value)
})

// #endregion

// #region OPTIONS_PANEL
const onMenuClick = (data: Date | [Date, Date] | Date[], label: string) => {
  let processedData: RangeOptionValue | Date | Date[] = data

  if (Array.isArray(data) && data.length === 2) {
    processedData = {
      startDate: data[0],
      endDate: data[1],
      selecting: false,
      selectedField: 'endDate',
    }
  }

  onDatePick(processedData)
  updateShowedMonths()
  menuState.value = label
}

const menuState = ref<string>('')

// #endregion

// #region VISUAL

const gridType = computed(() => {
  const time = props.time ? 'time' : ''
  const range = props.type === 'range' ? '-range' : ''
  const pick = props.type === 'pick' ? '-pick' : ''
  return `s-date-picker__panels_date${time}${range || pick || ''}`
})

const currentView = ref('dates')

const changeView = (viewName: string) => {
  currentView.value = viewName
}

const headTitle = computed(() => {
  if (menuState.value && menuState.value !== 'Custom') {
    return menuState.value
  }

  try {
    switch (props.type) {
      case 'day':
        return formatDate(props.modelValue)
      case 'range': {
        const modelValue = props.modelValue as Date[]
        return modelValue.map((item) => formatDate(item)).join(' - ')
      }

      case 'pick': {
        const modelValue = props.modelValue as Date[]
        return modelValue.map((item) => formatDate(item)).join(', ')
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
      date = rangeState[dateForTime.value as keyof RangeState] as Date | null
      if (!date) return
      ;(rangeState as any)[dateForTime.value as keyof RangeState] = new Date(
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
      date = rangeState[dateForTime.value as keyof RangeState] as Date | null
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
const updateCustomInput = (data: any, field?: string) => {
  switch (props.type) {
    case 'pick':
      if (data) {
        if (pickState.value.length > 0) pickState.value[pickState.value.length - 1] = data
        else pickState.value.push(data)
      }
      break
    case 'day':
      dayState.value = data
      break
    case 'range':
      if (data) (rangeState as any)[field as keyof RangeState] = data
      rangeStateRef.value.selecting = false
      break
    default:
  }
  updateModelValue()
  updateShowedMonths()
}

// #endregion

// #region FORMATTING

const formatPattern = computed(() => {
  return props.time ? 'dd/MM/yyyy, HH:mm' : 'dd/MM/yyyy'
})

const formatDate = (date: any) => {
  if (!date) return ''
  return format(date, formatPattern.value)
}

// #endregion

// #region POPPER
const [showPopper, togglePopper] = useToggle(false)
whenever(and(props.disabled, showPopper), () => togglePopper(false), { immediate: true })

const updateShow = () => {
  if (!props.disabled) togglePopper(true)
}
// #endregion

const save = () => {
  emit('update:modelValue', innerModelValue.value)
}
const saveAndClose = () => {
  save()
  togglePopper(false)
}

const showCustomInputs = computed(() => {
  return menuState.value === 'Custom' && !showStateView.value
})

if (innerModelValue.value || (innerModelValue.value as unknown as Date[])?.length > 0) init()
else updateModelValue()
</script>

<template>
  <div class="s-date-picker">
    <SPopover
      v-model:show="showPopper"
      placement="bottom-start"
      trigger="manual"
      distance="4"
      @click-outside="togglePopper(false)"
    >
      <template #trigger>
        <div>
          <slot
            v-bind="{
              disabled,
              updateShow,
              'isPopperShown': showPopper,
              'label': headTitle,
            }"
          >
            <div
              class="s-date-picker__header p-2 sora-tpg-ch2 relative pr-6"
              :class="disabled ? 'cursor-default' : 'cursor-pointer'"
              @keydown="updateShow"
              @click="updateShow"
            >
              {{ headTitle || 'Date' }}
              <div
                class="arrow"
                :class="arrowState"
              >
                <IconArrowsChevronBottom24 />
              </div>
            </div>
          </slot>
        </div>
      </template>
      <template #popper>
        <SPopoverWrappedTransition
          name="s-select-dropdown-transition"
          eager
        >
          <div
            class="s-date-picker__panels sora-tpg-p4"
            data-testid="date-picker"
            :class="[`${gridType}`, { 'narrow': showStateView }]"
          >
            <OptionsPanel
              :type="type"
              :menu-state="menuState"
              :options="shortcuts"
              @click:option="onMenuClick"
            />
            <CalendarsPanel
              :current-view="currentView"
              :show-state="showState"
              :model-value="innerModelValue"
              :state-store="stateStore"
              @update:showed-state="updateShowedState"
              @change-view="changeView"
              @pick="onDatePick"
            />
            <TimePanel
              v-if="time && !showStateView"
              :value="currentValueTime"
              @update:time="updateTime"
            />
            <CustomPanel
              :show-inputs="showCustomInputs"
              :state-store="stateStore"
              :format-date="formatDate"
              :format-pattern="formatPattern"
              @update:custom-input="updateCustomInput"
              @click:done="saveAndClose"
            />
          </div>
        </SPopoverWrappedTransition>
      </template>
    </SPopover>
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-date-picker {
  &__header {
    border-radius: 4px;
    border: 1px solid theme.token-as-var('sys.color.border-primary');

    .arrow {
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

  &__panels {
    display: grid;
    background-color: theme.token-as-var('sys.color.util.surface');

    grid-template-areas:
      'options calendars time'
      'options custom custom';
    max-height: 405px;
    border-radius: 4px;
    box-shadow: theme.token-as-var('sys.shadow.dropdown');
    overflow: hidden;

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
  }
}
</style>
