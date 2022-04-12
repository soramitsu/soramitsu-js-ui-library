<script lang="ts">
export default defineComponent({
  name: 'SDatePicker',
})
</script>

<script setup lang="ts">
import { SSelect } from '@/lib'
import DateTable from './src/date-table.vue'
import MonthTable from './src/month-table.vue'
import MonthPanel from './month-panel.vue'
import YearTable from './src/year-table.vue'
import TimePanel from './time-panel.vue'

interface Props {
  /**
    * Value of date picker component. Can be used with `v-model`.
   * Can be date object / array with date objects for date range picker
   */
  modelValue: any,
  type: 'day' | 'range' | 'pick',
  time: boolean,


  /**
   * Disabled state of the date picker component
   *
   * `false` by default
   */
  readonly disabled: boolean
  /**
   * Editable state of the date picker input
   *
   * `true` by default
   */
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'range',
  time: true,
})

const emit = defineEmits(['update:modelValue'])

const gridType = computed(() => {
  const time = props.time? 'time' : '';
  const range = props.type==='range' ? '--range' : ''
  return `custom-grid--date${time}${range}`
})

const isRange = computed(() => {
  return props.type==='range'
})

const inSelectingProgress = ref(false)


const onDatePick = (date: any) => {
  if (date.date) {
    emit('update:modelValue', date.date)
    return;
  }  
  // rangeState.value = date;
  emit('update:modelValue', [date.startDate, date.endDate])
}

// const onCalendarToPick = (date: any) => {
//   if (date.date) {
//     emit('update:modelValue', date.date)
//     return;
//   }  
//   // rangeState.value = date;
//   emit('update:modelValue', [date.startDate, date.endDate])
// }

const today = new Date()

// const rangeState = ref({
//   selecting: false,
//   startDate: new Date(today.getFullYear(), today.getMonth(), 1) || null,
//   endDate: new Date(today.getFullYear(), today.getMonth(), 7) || null,
// })

const showState = ref({
  month: 0,
  year: 0,
})

showState.value.month = today.getMonth();
showState.value.year = today.getFullYear();

const updateShowedMonth = (month: number) => {
  showState.value.month = month
  changeView('dates')
}

const updateShowedYear = (year: number) => {
  showState.value.year = year
  changeView('dates')
}

const nextMonthShowState = computed(() => {
  const month = showState.value.month > 10 ? 0 : showState.value.month + 1;
  const year = month === 0 ? showState.value.year + 1 : showState.value.year
  return {
    month,
    year
  }
})








const OPTIONS: any[] = [
  // {
  //   label: 'All time',
  //   value: 'all_time',
  // },
  // {
  //   label: 'Today',
  //   value: 'today',
  // },
  // {
  //   label: 'This week',
  //   value: 'this_week',
  // },
  // {
  //   label: 'Last week',
  //   value: 'last_week',
  // },
  // {
  //   label: 'This month',
  //   value: 'this_month',
  // },
  // {
  //   label: 'Last month',
  //   value: 'last_month',
  // },
  // {
  //   label: 'This year',
  //   value: 'this_year',
  // },
  // {
  //   label: 'Last year',
  //   value: 'last_year',
  // },
  // {
  //   label: 'Custom',
  //   value: 'custom',
  // }
  {
    label: 'Range',
    value: 'range',
  },
  {
    label: 'Day',
    value: 'day',
  },
  {
    label: 'Week',
    value: 'week',
  },
]

const pickType = ref(OPTIONS[1].value)

watch(pickType, (newVal, oldVal) => {
  if (newVal=='day') {
    emit('update:modelValue', today);
    return;
  }
  emit('update:modelValue', [new Date(today.getFullYear(), today.getMonth(), 1), new Date(today.getFullYear(), today.getMonth(), 7)])
})

const currentView = ref('dates')

const changeView = (viewName: string) => {
  currentView.value = viewName
}


const updateTime = (time:string) => {
  const arr = time.split(':').map(item => Number(item))   
  if (pickType.value!=='day') return;
  emit('update:modelValue', new Date(props.modelValue.getFullYear(), props.modelValue.getMonth(), props.modelValue.getDate(), arr[0], arr[1], 0));
}

const currentValueTime = computed(() => {
  if (pickType.value!=='day' || props.type !== 'day') return `00:00`
  const hours = timeDecoder(props.modelValue.getHours());
  const minutes = timeDecoder(props.modelValue.getMinutes());
  return `${hours}:${minutes}`
})

const timeDecoder = (num:number) => {
  return num.toString().length < 2? `0${num}` : num;
}



// const setRangeStateSelected = (payload: boolean) => {
//   rangeState.value.selecting  = payload

// }

const calendarToModelValue = computed(() => {
  return props.modelValue[1];
})

</script>

<template>
  <div>
    <SSelect 
      v-model="pickType"
      :options="OPTIONS"
      :multiple="false"
      label="Date"
    />
    <div
      class="custom-grid"
      :class="`${gridType}`"
    >
      <div class="select">
        Меню
      </div>
      <div class="calendar-from">
        <div
          v-show="currentView==='dates'"
          class="flex flex-col justify-start items-center"
        >
          <MonthPanel     
            class="w-full"   
            :show-month="showState.month"
            :show-year="showState.year"
            :target="'from'"
            @change-month="updateShowedMonth"
            @change-year="updateShowedYear"
            @change-view="changeView"
          />      
          <DateTable
            :value="modelValue"
            :date="new Date()"
            :selection-mode="pickType"
            :show-state="showState"
            :target="'from'"
            @pick="onDatePick"
            v-model:selecting="inSelectingProgress"
          />          
        </div>
        <div v-if="currentView==='months'">
          <MonthTable
            class="h-full"
            :value="showState.month"
            :date="new Date()"
            :selection-mode="pickType"
            :default-value="null"
            @pick="updateShowedMonth"
          />
        </div>
        <div v-if="currentView==='years'">
          Года 
          <YearTable
            :date="new Date()"
            :value="showState.year"
            @pick="updateShowedYear"
          />
        </div>
      </div>
      <div
        v-if="isRange"
        class="calendar-to"
      >
        <div
          v-show="currentView==='dates'"
          class="flex flex-col justify-start items-center"
        >
          <MonthPanel     
            class="w-full"   
            :show-month="nextMonthShowState.month"
            :show-year="nextMonthShowState.year"
            @change-month="updateShowedMonth"
            @change-year="updateShowedYear"
            @change-view="changeView"
          />      
          <DateTable
            :value="calendarToModelValue"
            :date="new Date()"
            :selection-mode="pickType"
            :show-state="nextMonthShowState"
            :target="'to'"
            @pick="onDatePick"
            v-model:selecting="inSelectingProgress"
          />
        </div>
      </div>
      <div
        v-if="time"
        class="time"
      >
        <TimePanel
          :value="currentValueTime"
          @update-time="updateTime"
        />
      </div>
      <div class="custom-panel">
        Кустом
      </div>
    </div>
    <!-- <div v-show="currentView==='dates'">
      <MonthPanel        
        :show-month="showState.month"
        :show-year="showState.year"
        @change-month="updateShowedMonth"
        @change-year="updateShowedYear"
        @change-view="changeView"
      />      
      Календарь <DateTable
        :value="modelValue"
        :date="new Date()"
        :selection-mode="pickType"
        :show-state="showState"
        @pick="onDatePick"
      />
    </div> -->
    <!-- <div v-if="currentView==='months'">
      <MonthTable
        :value="showState.month"
        :date="new Date()"
        :selection-mode="pickType"
        :default-value="null"
        @pick="updateShowedMonth"
      />
    </div>
    <div v-if="currentView==='years'">
      Года 
      <YearTable
        :date="new Date()"
        :value="showState.year"
        @pick="updateShowedYear"
      />
    </div> -->
    <!-- <div>
      Время {{ mockTime }}
    </div>
    <div>Даты</div> -->
    <!-- <span
      v-if="willPlaceholderBeShown"
      class="s-placeholder"
    >{{ placeholder }}</span>
    <el-date-picker
      ref="picker"
      :model-value="modelValue"
      :type="type"
      :unlink-panels="unlinkPanels"
      :readonly="readonly"
      :disabled="disabled"
      :size="size"
      :editable="editable"
      :clearable="willHaveClearButton"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="format"
      :align="align"
      :popper-class="computedPopperClass"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :default-value="defaultValue"
      :default-time="defaultTime"
      :value-format="valueFormat"
      prefix-icon="-"
      :clear-icon="clearIcon"
      :validate-event="validateEvent"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @input="(event: any) => $emit('update:modelValue', event.target.value)"
    >
      <slot
        slot="range-separator"
        name="range-separator"
      />
    </el-date-picker>
    <s-icon
      v-if="!isInputType"
      name="chevron-down-rounded-16"
    /> -->
  </div>
</template>

<style lang="scss" scoped>

.custom-grid {
  display: grid;
  
 grid-template-areas: 
    "select cal cale time"
    "select custom custom custom";
  grid-template-columns: 150px 320px 320px 76px;
  grid-template-rows: 342px 1fr;
  height: 405px;
  width: 886px;

  &--date {
    grid-template-areas: 
    "select cal"
    "select custom";
  width: 522px;
  grid-template-columns: 150px 320px;
  }
  &--date--range {
    grid-template-areas: 
    "select cal cale"
    "select custom custom";
  width: 822px;
  grid-template-columns: 150px 320px 320px;
  }

  &--datetime{
    grid-template-areas: 
    "select cal  time"
    "select custom custom";
  width: 558px;
  grid-template-columns: 150px 320px 76px;
  }

  // &--datetime--range {
  //   grid-template-areas: 
  //   "select cal   time"
  //   "select custom custom";
  // }
}



.select {
  @apply border;
  grid-area: select;
}
.calendar-from {
  @apply border;
    grid-area: cal;
}
.calendar-to {
  @apply border;
    grid-area: cale;
}
.time {
  @apply border;
    grid-area: time;
}
.custom-panel {
  @apply border;
    grid-area: custom;
}

</style>