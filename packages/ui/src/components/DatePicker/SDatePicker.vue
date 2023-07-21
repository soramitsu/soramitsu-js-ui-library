<script setup lang="ts">
import TimePanel from './SDatePickerPanelTime.vue'
import OptionsPanel from './SDatePickerPanelOptions.vue'
import CalendarsPanel from './SDatePickerPanelCalendars.vue'
import CustomPanel from './SDatePickerPanelCustom.vue'

import { IconArrowsChevronBottom24 } from '@/components/icons'
import { SPopover, SPopoverWrappedTransition } from '@/components/Popover'
import { and } from '@vueuse/math'
import { format, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns'

import {
  DatePickerOptions,
  DatePickerOptionsProp,
  DatePickerType,
  DateState,
  ModelValueType,
  PickState,
  PossiblePresetOption,
  RangePickEventValue,
  RangeState,
  ShowState,
  StateStore,
} from './types'
import { DATE_PICKER_API_KEY, DatePickerApi } from './api'
import { CUSTOM_OPTION, CUSTOM_OPTION_VALUE, DEFAULT_SHORTCUTS } from './consts'
import { shallowRef } from 'vue'

interface Props {
  modelValue: ModelValueType
  type?: DatePickerType
  time?: boolean
  disabled?: boolean
  shortcuts?: DatePickerOptionsProp
  dateFilter?: (d: Date) => boolean
  min?: Date | null
  max?: Date | null
}
const props = withDefaults(defineProps<Props>(), {
  type: 'day',
  time: false,
  disabled: false,
  shortcuts: () => DEFAULT_SHORTCUTS,
  dateFilter: () => true,
  min: null,
  max: null,
})

const innerModelValue = shallowRef<ModelValueType>(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const dateFilter = (d: Date) => {
  const minDate = props.min && startOfDay(new Date(props.min))
  const maxDate = props.max && startOfDay(new Date(props.max))

  return (
    props.dateFilter(d) &&
    (!minDate || isAfter(d, minDate) || isSameDay(d, minDate)) &&
    (!maxDate || isBefore(d, maxDate) || isSameDay(d, maxDate))
  )
}
const datePickerConfig: DatePickerApi = reactive({
  type: props.type,
  time: props.time,
  disabled: props.disabled,
  dateFilter,
})

provide(DATE_PICKER_API_KEY, datePickerConfig)

// #region STATE_STORE

const today = new Date()
const dateForTime = ref<string>('')

const rangeState = ref<RangeState>({
  selecting: false,
  startDate: null,
  endDate: null,
})
const dayState = ref<DateState>(null)
const pickState = ref<PickState>([])
init(innerModelValue.value)

const stateStore = computed<StateStore>(() => {
  return {
    dayState: dayState.value,
    pickState: pickState.value,
    rangeState: rangeState.value,
  }
})

function init(initialValue: ModelValueType) {
  if (props.type === 'day') {
    dayState.value = initialValue as DateState
  } else if (props.type === 'pick') {
    pickState.value = (initialValue as PickState | null) ?? []
  } else {
    if (Array.isArray(initialValue) && initialValue.length === 2) {
      ;[rangeState.value.startDate, rangeState.value.endDate] = initialValue
    }
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
    if (!rangeState.value.startDate && !rangeState.value.endDate && !rangeState.value.selecting) {
      innerModelValue.value = null
      save()

      return
    }

    innerModelValue.value = [rangeState.value.startDate as Date, rangeState.value.endDate as Date]

    if (rangeState.value.endDate) {
      save()
    }
  }
}

const onDatePick = (data: RangePickEventValue | Date | Date[] | null) => {
  if (props.type === 'day') {
    dayState.value = data as Date | null
  } else if (props.type === 'pick') {
    pickState.value = data as Date[]
    setDateForTimeFieldName(pickState.value.length - 1)
  } else {
    const { selectedField, ...rsData } = data as RangePickEventValue
    rangeState.value = rsData

    setDateForTimeFieldName(selectedField)
  }
  updateModelValue()
}

// #endregion

// #region SHOW_STATE

function updateShowedMonths() {
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
const onMenuClick = (data: PossiblePresetOption) => {
  selectedMenuOption.value = data

  if (data.value === CUSTOM_OPTION_VALUE) {
    return
  }

  let processedData: RangePickEventValue | Date | Date[] | null

  switch (props.type) {
    case 'range': {
      let dateRange: { startDate: null; endDate: null } | { startDate: Date; endDate: Date } = {
        startDate: null,
        endDate: null,
      }

      if (data.value && Array.isArray(data.value) && data.value[0] instanceof Date && data.value[1] instanceof Date) {
        dateRange = { startDate: data.value[0], endDate: data.value[1] }
      }

      processedData = {
        ...dateRange,
        selecting: false,
        selectedField: 'endDate',
      }
      break
    }
    case 'pick':
      processedData = data.value ?? []
      break
    case 'day':
      processedData = data.value
      break
  }

  onDatePick(processedData)
  updateShowedMonths()
}

const finalShortcuts = computed((): Required<DatePickerOptions> => {
  return {
    day: [...(props.shortcuts.day ?? []), CUSTOM_OPTION],
    range: [...(props.shortcuts.range ?? []), CUSTOM_OPTION],
    pick: [...(props.shortcuts.pick ?? []), CUSTOM_OPTION],
  }
})

const isEqualDateArrays = (a: Date[], b: Date[]) => {
  for (const i in a) {
    if (!isSameDay(a[i], b[i])) {
      return false
    }
  }

  return true
}

const isSameValue = (a: ModelValueType, b: ModelValueType) => {
  return (
    (a === null && b === null) ||
    (a === undefined && b === undefined) ||
    (a instanceof Date && b instanceof Date && isSameDay(a, b)) ||
    (Array.isArray(a) && Array.isArray(b) && isEqualDateArrays(a, b))
  )
}

const selectedMenuOption = shallowRef<PossiblePresetOption>(CUSTOM_OPTION)
const appropriateMenuOption = computed(() => {
  for (const shortcut of finalShortcuts.value[props.type]) {
    if (shortcut.value === CUSTOM_OPTION_VALUE) continue

    if (isSameValue(innerModelValue.value, shortcut.value)) {
      return shortcut
    }
  }

  return CUSTOM_OPTION
})
watch(
  innerModelValue,
  () => {
    selectedMenuOption.value = appropriateMenuOption.value
  },
  { immediate: true },
)

const isPickingAreaVisible = computed(() => innerModelValue.value || selectedMenuOption.value === CUSTOM_OPTION)

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
  if (appropriateMenuOption.value.value !== CUSTOM_OPTION_VALUE) {
    return appropriateMenuOption.value.label
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
      if (!date) return
      dayState.value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), arr[0], arr[1], 0)
      break
    case 'range':
      date = rangeState.value[dateForTime.value as keyof RangeState] as Date | null
      if (!date) return
      ;(rangeState.value as any)[dateForTime.value as keyof RangeState] = new Date(
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
      if (data) (rangeState.value as any)[field as keyof RangeState] = data
      rangeState.value.selecting = false
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
whenever(
  and(() => props.disabled, showPopper),
  () => togglePopper(false),
  { immediate: true },
)

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
  return selectedMenuOption.value.value === CUSTOM_OPTION_VALUE && !showStateView.value
})
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
              v-if="type !== 'pick'"
              :type="type"
              :menu-state="selectedMenuOption.label"
              :options="finalShortcuts"
              @click:option="onMenuClick"
            />

            <template v-if="isPickingAreaVisible">
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
            </template>
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
