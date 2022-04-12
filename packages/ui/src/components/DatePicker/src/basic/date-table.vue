
<script setup lang="ts">
import { getFirstDayOfMonth, getDayCountOfMonth, getWeekNumber, getStartDateOfMonth, prevDate, nextDate, isDate, clearTime as _clearTime } from '../date-util';
// import Locale from 'element-ui/src/mixins/locale';
import { arrayFindIndex, arrayFind, coerceTruthyValueToArray } from '../utils';
import { PickerTypes, PickerAlignment, InputTypes, BorderRadius, Size } from '../../consts'

const WEEKSstr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const getDateTimestamp = function (time: any) {
  if (typeof time === 'number' || typeof time === 'string') {
    return _clearTime(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return _clearTime(time).getTime();
  } else {
    return NaN;
  }
};
const tableRows: any = [[], [], [], [], [], []];
// remove the first element that satisfies `pred` from arr
// return a new array if modification occurs
// return the original array otherwise
/* eslint-disable complexity */
/* eslint-disable complexity */
const removeFromArray = function (arr: any, pred: any) {
  const idx = typeof pred === 'function' ? arrayFindIndex(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
};

interface Props {
  type: PickerTypes;
  firstDayOfWeek: number;
  value: any,
  defaultValue: any,
  date: Date,
  selectionMode: 'day' | 'dates' | 'week' | 'range'
  showWeekNumber: boolean,
  disabledDate: Function,

  cellClassName: Function,
  minDate?: any,
  maxDate?: any,
  rangeState: any
}

const props = withDefaults(defineProps<Props>(), {
  type: PickerTypes.DATE,
  inputType: InputTypes.INPUT,
  unlinkPanels: false,
  readonly: false,
  disabled: false,
  editable: true,
  clearable: true,
  placeholder: '',
  startPlaceholder: '',
  endPlaceholder: '',
  align: PickerAlignment.LEFT,
  rangeSeparator: '-',
  clearIcon: 'el-icon-circle-close',
  validateEvent: true,
  borderRadius: BorderRadius.SMALL,
  size: Size.MEDIUM,
  selectionMode: 'day',
  firstDayOfWeek: 1,
  defaultValue: new Date(),
  showWeekNumber: true,
  disabledDate: () => {},
  cellClassName: () => {},
  minDate: '1',
  maxDate: '2',
})


const emit = defineEmits(['changerange', 'pick', 'updateRangeStateSel'])

const offsetDay = computed(() => {
  const week = props.firstDayOfWeek;
  // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
  return week > 3 ? 7 - week : -week;
});
const WEEKS = computed(() => {
  const week = props.firstDayOfWeek;
  return WEEKSstr.concat(WEEKSstr).slice(week, week + 7);
});
const year = computed(() => {
  return props.date.getFullYear();
});
const month = computed(() => {
  return props.date.getMonth();
});
const startDate = computed(() => {
  return getStartDateOfMonth(year.value, month.value);
})

const rows: any = computed(() => {
  // TODO: refactory rows / getCellClasses
  const date = new Date(year.value, month.value, 1);
  let day = getFirstDayOfMonth(date); // day of first day
  const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
  const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));
  day = (day === 0 ? 7 : day);
  const offset = offsetDay.value;
  const rows = tableRows;
  let count = 1;
  // const startDate = startDate.value;
  const disabledDate = props.disabledDate;
  const cellClassName = props.cellClassName;
  const selectedDate = props.selectionMode === 'dates' ? coerceTruthyValueToArray(props.value) : [];
  const now = getDateTimestamp(new Date());
  for (let i = 0; i < 6; i++) {
    const row = rows[i];
    if (props.showWeekNumber) {
      if (!row[0]) {
        row[0] = { type: 'week', text: getWeekNumber(nextDate(startDate.value, i * 7 + 1)) };
      }
    }
    for (let j = 0; j < 7; j++) {
      let cell = row[props.showWeekNumber ? j + 1 : j];
      if (!cell) {
        cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
      }
      cell.type = 'normal';
      const index = i * 7 + j;
      const time = nextDate(startDate.value, index - offset).getTime();
      cell.inRange = time >= getDateTimestamp(props.minDate) && time <= getDateTimestamp(props.maxDate);
      cell.start = props.minDate && time === getDateTimestamp(props.minDate);
      cell.end = props.maxDate && time === getDateTimestamp(props.maxDate);
      const isToday = time === now;
      if (isToday) {
        cell.type = 'today';
      }
      if (i >= 0 && i <= 1) {
        const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset;
        if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
          cell.text = count++;
        } else {
          cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7;
          cell.type = 'prev-month';
        }
      } else {
        if (count <= dateCountOfMonth) {
          cell.text = count++;
        } else {
          cell.text = count++ - dateCountOfMonth;
          cell.type = 'next-month';
        }
      }
      let cellDate = new Date(time);
      cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
      cell.selected = arrayFind(selectedDate, (date: any) => date.getTime() === cellDate.getTime());
      cell.customClass = typeof cellClassName === 'function' && cellClassName(cellDate);
      // $set(row, this.showWeekNumber ? j + 1 : j, cell);
      row[props.showWeekNumber ? j + 1 : j] = cell;
    }
    if (props.selectionMode === 'week') {
      const start = props.showWeekNumber ? 1 : 0;
      const end = props.showWeekNumber ? 7 : 6;
      const isCurrWeekActive = isWeekActive(row[start + 1]);
      row[start].inRange = isCurrWeekActive;
      row[start].start = isCurrWeekActive;
      row[end].inRange = isCurrWeekActive;
      row[end].end = isCurrWeekActive;
    }
  }
  return rows;
})
// export default {
//   mixins: [Locale],
//   props: {
//     firstDayOfWeek: {
//       default: 7,
//       type: Number,
//       validator: val => val >= 1 && val <= 7
//     },
//     value: {},
//     defaultValue: {
//       validator(val) {
//         // either: null, valid Date object, Array of valid Date objects
//         return val === null || isDate(val) || (Array.isArray(val) && val.every(isDate));
//       }
//     },
//     date: {},
//     selectionMode: {
//       default: 'day'
//     },
//     showWeekNumber: {
//       type: Boolean,
//       default: false
//     },
//     disabledDate: {},

//     cellClassName: {},
//     minDate: {},
//     maxDate: {},
//     rangeState: {
//       default() {
//         return {
//           endDate: null,
//           selecting: false
//         };
//       }
//     }
//   },
//   computed: {
//     offsetDay() {
//       const week = this.firstDayOfWeek;
//       // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
//       return week > 3 ? 7 - week : -week;
//     },
//     WEEKS() {
//       const week = this.firstDayOfWeek;
//       return WEEKS.concat(WEEKS).slice(week, week + 7);
//     },

//     rows() {
//       // TODO: refactory rows / getCellClasses
//       const date = new Date(this.year, this.month, 1);
//       let day = getFirstDayOfMonth(date); // day of first day
//       const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
//       const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));
//       day = (day === 0 ? 7 : day);
//       const offset = this.offsetDay;
//       const rows = this.tableRows;
//       let count = 1;
//       const startDate = this.startDate;
//       const disabledDate = this.disabledDate;
//       const cellClassName = this.cellClassName;
//       const selectedDate = this.selectionMode === 'dates' ? coerceTruthyValueToArray(this.value) : [];
//       const now = getDateTimestamp(new Date());
//       for (let i = 0; i < 6; i++) {
//         const row = rows[i];
//         if (this.showWeekNumber) {
//           if (!row[0]) {
//             row[0] = { type: 'week', text: getWeekNumber(nextDate(startDate, i * 7 + 1)) };
//           }
//         }
//         for (let j = 0; j < 7; j++) {
//           let cell = row[this.showWeekNumber ? j + 1 : j];
//           if (!cell) {
//             cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
//           }
//           cell.type = 'normal';
//           const index = i * 7 + j;
//           const time = nextDate(startDate, index - offset).getTime();
//           cell.inRange = time >= getDateTimestamp(this.minDate) && time <= getDateTimestamp(this.maxDate);
//           cell.start = this.minDate && time === getDateTimestamp(this.minDate);
//           cell.end = this.maxDate && time === getDateTimestamp(this.maxDate);
//           const isToday = time === now;
//           if (isToday) {
//             cell.type = 'today';
//           }
//           if (i >= 0 && i <= 1) {
//             const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset;
//             if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
//               cell.text = count++;
//             } else {
//               cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7;
//               cell.type = 'prev-month';
//             }
//           } else {
//             if (count <= dateCountOfMonth) {
//               cell.text = count++;
//             } else {
//               cell.text = count++ - dateCountOfMonth;
//               cell.type = 'next-month';
//             }
//           }
//           let cellDate = new Date(time);
//           cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
//           cell.selected = arrayFind(selectedDate, date => date.getTime() === cellDate.getTime());
//           cell.customClass = typeof cellClassName === 'function' && cellClassName(cellDate);
//           this.$set(row, this.showWeekNumber ? j + 1 : j, cell);
//         }
//         if (this.selectionMode === 'week') {
//           const start = this.showWeekNumber ? 1 : 0;
//           const end = this.showWeekNumber ? 7 : 6;
//           const isWeekActive = this.isWeekActive(row[start + 1]);
//           row[start].inRange = isWeekActive;
//           row[start].start = isWeekActive;
//           row[end].inRange = isWeekActive;
//           row[end].end = isWeekActive;
//         }
//       }
//       return rows;
//     }
//   },
//   watch: {
//     'rangeState.endDate'(newVal) {
//       this.markRange(this.minDate, newVal);
//     },
//     minDate(newVal, oldVal) {
//       if (getDateTimestamp(newVal) !== getDateTimestamp(oldVal)) {
//         this.markRange(this.minDate, this.maxDate);
//       }
//     },
//     maxDate(newVal, oldVal) {
//       if (getDateTimestamp(newVal) !== getDateTimestamp(oldVal)) {
//         this.markRange(this.minDate, this.maxDate);
//       }
//     }
//   },
//   data() {
//     return {
//       tableRows: [ [], [], [], [], [], [] ],
//       lastRow: null,
//       lastColumn: null
//     };
//   },
//   methods: {
const cellMatchesDate = (cell: any, date: Date) => {
  const value = new Date(date);
  return year.value === value.getFullYear() &&
    month.value === value.getMonth() &&
    Number(cell.text) === value.getDate();
};
const getCellClasses = (cell: any) => {
  const selectionMode = props.selectionMode;
  const defaultValue = props.defaultValue ? Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue] : [];
  let classes = [];
  if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
    classes.push('available');
    if (cell.type === 'today') {
      classes.push('today');
    }
  } else {
    classes.push(cell.type);
  }
  if (cell.type === 'normal' && defaultValue.some(date => cellMatchesDate(cell, date))) {
    classes.push('default');
  }
  if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && cellMatchesDate(cell, props.value)) {
    classes.push('current');
  }
  if (cell.inRange && ((cell.type === 'normal' || cell.type === 'today') || props.selectionMode === 'week')) {
    classes.push('in-range');
    if (cell.start) {
      classes.push('start-date');
    }
    if (cell.end) {
      classes.push('end-date');
    }
  }
  if (cell.disabled) {
    classes.push('disabled');
  }
  if (cell.selected) {
    classes.push('selected');
  }
  if (cell.customClass) {
    classes.push(cell.customClass);
  }
  return classes.join(' ');
};
const getDateOfCell = (row: any, column: any) => {
  const offsetFromStart = row * 7 + (column - (props.showWeekNumber ? 1 : 0)) - offsetDay.value;
  return nextDate(startDate.value, offsetFromStart);
};
const isWeekActive = (cell: any) => {
  if (props.selectionMode !== 'week') return false;
  const newDate = new Date(year.value, month.value, 1);
  const yearNum = newDate.getFullYear();
  const monthNum = newDate.getMonth();
  if (cell.type === 'prev-month') {
    newDate.setMonth(monthNum === 0 ? 11 : monthNum - 1);
    newDate.setFullYear(monthNum === 0 ? yearNum - 1 : yearNum);
  }
  if (cell.type === 'next-month') {
    newDate.setMonth(monthNum === 11 ? 0 : monthNum + 1);
    newDate.setFullYear(monthNum === 11 ? yearNum + 1 : yearNum);
  }
  newDate.setDate(parseInt(cell.text, 10));
  if (isDate(props.value)) {
    const dayOffset = (props.value.getDay() - props.firstDayOfWeek + 7) % 7 - 1;
    const weekDate = prevDate(props.value, dayOffset);
    return weekDate.getTime() === newDate.getTime();
  }
  return false;
};
//     markRange(minDate, maxDate) {
//       minDate = getDateTimestamp(minDate);
//       maxDate = getDateTimestamp(maxDate) || minDate;
//       [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
//       const startDate = this.startDate;
//       const rows = this.rows;
//       for (let i = 0, k = rows.length; i < k; i++) {
//         const row = rows[i];
//         for (let j = 0, l = row.length; j < l; j++) {
//           if (this.showWeekNumber && j === 0) continue;
//           const cell = row[j];
//           const index = i * 7 + j + (this.showWeekNumber ? -1 : 0);
//           const time = nextDate(startDate, index - this.offsetDay).getTime();
//           cell.inRange = minDate && time >= minDate && time <= maxDate;
//           cell.start = minDate && time === minDate;
//           cell.end = maxDate && time === maxDate;
//         }
//       }
//     },

const lastRow = ref(0);
const lastColumn = ref(0);
const handleMouseMove = (event: any) => {
  if (!props.rangeState.selecting) return;
  let target = event.target;
  if (target.tagName === 'SPAN') {
    target = target.parentNode.parentNode;
  }
  if (target.tagName === 'DIV') {
    target = target.parentNode;
  }
  if (target.tagName !== 'TD') return;
  const row = target.parentNode.rowIndex - 1;
  const column = target.cellIndex;
  // can not select disabled date
  if (rows.value[row][column].disabled) return;
  // only update rangeState when mouse moves to a new cell
  // this avoids frequent Date object creation and improves performance
  if (row !== lastRow.value || column !== lastColumn) {
    lastRow.value = row;
    lastColumn.value = column;
    emit('changerange', {
      minDate: props.minDate,
      maxDate: props.maxDate,
      rangeState: {
        selecting: true,
        endDate: getDateOfCell(row, column)
      }
    });
  }
};
const handleClick = function (ev: any) {
  let target = ev.target;
  if (target.tagName === 'SPAN') {
    target = target.parentNode.parentNode;
  }
  if (target.tagName === 'DIV') {
    target = target.parentNode;
  }
  if (target.tagName !== 'TD') return;
  const row = target.parentNode.rowIndex - 1;
  const column = props.selectionMode === 'week' ? 1 : target.cellIndex;
  const cell = rows.value[row][column];
  if (cell.disabled || cell.type === 'week') return;
  const newDate = getDateOfCell(row, column);
  if (props.selectionMode === 'range') {
    if (!props.rangeState.selecting) {
      emit('pick', { minDate: newDate, maxDate: null });
      emit('updateRangeStateSel', true);
      // props.rangeState.selecting = true;
    } else {
      if (newDate >= props.minDate) {
        emit('pick', { minDate: props.minDate, maxDate: newDate });
      } else {
        emit('pick', { minDate: newDate, maxDate: props.minDate });
      }
      // props.rangeState.selecting = false;
      emit('updateRangeStateSel', false);
    }
  } else if (props.selectionMode === 'day') {
    emit('pick', newDate);
  } else if (props.selectionMode === 'week') {
    const weekNumber = getWeekNumber(newDate);
    const value = newDate.getFullYear() + 'w' + weekNumber;
    emit('pick', {
      year: newDate.getFullYear(),
      week: weekNumber,
      value: value,
      date: newDate
    });
  } else if (props.selectionMode === 'dates') {
    const value = props.value || [];
    const newValue = cell.selected
      ? removeFromArray(value, (date: any) => date.getTime() === newDate.getTime())
      : [...value, newDate];
    emit('pick', newValue);
  }
}
    // }
  // };
</script>
<template>
  <table
    cellspacing="0"
    cellpadding="0"
    class="el-date-table"
    @click="handleClick"
    @mousemove="handleMouseMove"
    :class="{ 'is-week-mode': selectionMode === 'week' }"
  >
    <tbody>
      <tr>
        <th v-if="showWeekNumber">{{ 'WEEK' }}</th>
        <th v-for="(week, key) in WEEKS" :key="key">{{ 'WEEKS' + week }}</th>
      </tr>
      <tr
        class="el-date-table__row"
        v-for="(row, key) in rows"
        :class="{ current: isWeekActive(row[1]) }"
        :key="key"
      >
        <td v-for="(cell, key) in row" :class="getCellClasses(cell)" :key="key">
          <div>
            <span>{{ cell.text }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style></style>