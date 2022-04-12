
<script setup lang="ts">
// import { getFirstDayOfMonth, getDayCountOfMonth, getWeekNumber, getStartDateOfMonth, prevDate, nextDate, isDate, clearTime as _clearTime } from '../date-util';
// import Locale from 'element-ui/src/mixins/locale';
// import { arrayFindIndex, arrayFind, coerceTruthyValueToArray } from '../utils';
// import { PickerTypes, PickerAlignment, InputTypes, BorderRadius, Size } from '../../consts'

import { inRange } from 'lodash';
import {getFirstDayOfMonth, getDayCountOfMonth, getStartDateOfMonth, prevDate, isDate, getWeekNumber, nextDate, clearTime as _clearTime, today } from './utils/date-util';

const daysNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// const today = new Date()

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
// const removeFromArray = function (arr: any, pred: any) {
//   const idx = typeof pred === 'function' ? arrayFindIndex(arr, pred) : arr.indexOf(pred);
//   return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
// };

interface Props {
  // type: PickerTypes;
  firstDayOfWeek: number;
  value: any,
  // defaultValue: any,
  date: Date,
  selectionMode: 'day' | 'dates' | 'week' | 'range'
  showWeekNumber: boolean,
  showState: any,
  target: 'pick' | 'from' | 'to' | 'both',
  selecting: boolean
  // disabledDate: Function,

  // cellClassName: Function,
  // minDate?: any,
  // maxDate?: any,
  // rangeState: any
}

const props = withDefaults(defineProps<Props>(), {
  // type: PickerTypes.DATE,
  // inputType: InputTypes.INPUT,
  // unlinkPanels: false,
  // readonly: false,
  // disabled: false,
  // editable: true,
  // clearable: true,
  // placeholder: '',
  // startPlaceholder: '',
  // endPlaceholder: '',
  // align: PickerAlignment.LEFT,
  // rangeSeparator: '-',
  // clearIcon: 'el-icon-circle-close',
  // validateEvent: true,
  // borderRadius: BorderRadius.SMALL,
  // size: Size.MEDIUM,
  selectionMode: 'week',
  firstDayOfWeek: 1,
  // defaultValue: new Date(),
  showWeekNumber: false,
  showState: { month: today.getMonth(), year: today.getFullYear()},
  // disabledDate: () => {},
  // cellClassName: () => {},
  // minDate: '1',
  // maxDate: '2',
  // rangeState: {
  //   startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()-1),
  //   endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  //   selecting: false
  // },
  value: new Date(),
  target: 'pick',
  selecting: false
})

const isRange = computed(() => {
  return !['day'].includes(props.selectionMode)
})

const currentValue = computed(() => {
  return isRange.value ? [props.value[0], props.value[1]] : props.value
  // return props.value
})

// const rangeState = ref({
//   startDate: null,
//   endDate: null,
//   selecting: false
// })




const emit = defineEmits(['changerange', 'pick', 'updateRangeStateSel', 'update:selecting'])

const offsetDay = computed(() => {
  const week = props.firstDayOfWeek;
  // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
  return week > 3 ? 7 - week : -week;
});
const WEEKS = computed(() => {
  const week = props.firstDayOfWeek;
  return daysNames.concat(daysNames).slice(week, week + 7);
});
const year = computed(() => {
  // return props.date.getFullYear();
  // if (props.target ==='to') {
  //   if (props.showState.month > 11) return props.showState.year + 1;
  // }
  return props.showState.year;
});
const month = computed(() => {
  // return props.date.getMonth();
  // if (props.target ==='to') {
  //   if (props.showState.month > 11) return 1;
  //   return props.showState.month + 1;
  // }
  return props.showState.month;
});
const startDate = computed(() => {
  return getStartDateOfMonth(year.value, month.value);
})

const rows: any = computed(() => {
  // TODO: refactory rows / getCellClasses
  const date = new Date(year.value, month.value, 1);
  let day = getFirstDayOfMonth(date); // day of first day
  const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth()); // Количество дней в текущем месяце
  const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1)); // Количество дней в предыдущем месяце
  day = (day === 0 ? 7 : day);
  const offset = offsetDay.value;
  const rows = tableRows;
  let count = 1;
  // const cellClassName = props.cellClassName;
  // const selectedDate = props.selectionMode === 'dates' ? coerceTruthyValueToArray(props.value) : [];
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
      // if (isRange.value) {
        const minDate = currentValue.value[0]
        const maxDate = currentValue.value[1]
        cell.inRange = time >= getDateTimestamp(minDate) && time <= getDateTimestamp(maxDate);
        cell.start = minDate && time === getDateTimestamp(minDate);
        cell.end = maxDate && time === getDateTimestamp(maxDate);
        // console.log(cell.inRange, minDate,time,  getDateTimestamp(minDate), time === getDateTimestamp(minDate))
      // }
      
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
      // cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
      // cell.selected = arrayFind(selectedDate, (date: any) => date.getTime() === cellDate.getTime());
      // cell.customClass = typeof cellClassName === 'function' && cellClassName(cellDate);
      row[props.showWeekNumber ? j + 1 : j] = cell;
    }
    // if (props.selectionMode === 'week') {
    //   const start = props.showWeekNumber ? 1 : 0;
    //   const end = props.showWeekNumber ? 7 : 6;
    //   const isCurrWeekActive = isWeekActive(row[start + 1]);
    //   row[start].inRange = isCurrWeekActive;
    //   row[start].start = isCurrWeekActive;
    //   row[end].inRange = isCurrWeekActive;
    //   row[end].end = isCurrWeekActive;
    // }
  }
  return rows;
})

const cellMatchesDate = (cell: any, date: Date) => {
  const value = new Date(date);
  return year.value === value.getFullYear() &&
    month.value === value.getMonth() &&
    Number(cell.text) === value.getDate();
};
const getCellClasses = (cell: any) => {
  const selectionMode = props.selectionMode;
  // const defaultValue = props.defaultValue ? Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue] : [];
  const defaultValue : any[] = [];
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
  if (isDate(currentValue.value)) {
    const dayOffset = (props.value.getDay() - props.firstDayOfWeek + 7) % 7 - 1;
    const weekDate = prevDate(props.value, dayOffset);
    return weekDate.getTime() === newDate.getTime();
  }
  return false;
};
    // markRange(minDate, maxDate) {
    //   minDate = getDateTimestamp(minDate);
    //   maxDate = getDateTimestamp(maxDate) || minDate;
    //   [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
    //   const startDate = this.startDate;
    //   const rows = this.rows;
    //   for (let i = 0, k = rows.length; i < k; i++) {
    //     const row = rows[i];
    //     for (let j = 0, l = row.length; j < l; j++) {
    //       if (this.showWeekNumber && j === 0) continue;
    //       const cell = row[j];
    //       const index = i * 7 + j + (this.showWeekNumber ? -1 : 0);
    //       const time = nextDate(startDate, index - this.offsetDay).getTime();
    //       cell.inRange = minDate && time >= minDate && time <= maxDate;
    //       cell.start = minDate && time === minDate;
    //       cell.end = maxDate && time === maxDate;
    //     }
    //   }
    // },

let lastRow = ref(null);
let lastColumn = ref(null);
const handleMouseMove = (event: any) => {
  if (!props.selecting) return;
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
    // emit('changerange', {
    //   minDate: props.minDate,
    //   maxDate: props.maxDate,
    //   rangeState: {
    //     selecting: true,
    //     endDate: getDateOfCell(row, column)
    //   }
    // });
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
  console.log(newDate)
  if (props.selectionMode === 'range') {
    if (!props.selecting) {
      emit('pick', {
      startDate: newDate,
      endDate: null,
      // selecting: true
    });
      // rangeState.value
      // emit('pick', { minDate: newDate, maxDate: null });
      emit('update:selecting', true);
      // props.selecting.value = true;
    } else {
      if (newDate >= props.value[0]) {
         emit('pick', {
      startDate: props.value[0],
      endDate: newDate,
      // selecting: false
    });
        // emit('pick', { minDate: props.minDate, maxDate: newDate });
      } else {
        emit('pick', {
      startDate: newDate,
      endDate: props.value[0],
      // selecting: false
    });
      }
      // props.rangeState.selecting = false;
      // emit('updateRangeStateSel', false);
      // selecting.value = false
      emit('update:selecting', true);
    }
  } 
  else if (props.selectionMode === 'day') {
    emit('pick', { date : newDate });
  } else if (props.selectionMode === 'week') {
    // const weekNumber = getWeekNumber(newDate);
    // const value = newDate.getFullYear() + 'w' + weekNumber;
    // emit('pick', {
    //   year: newDate.getFullYear(),
    //   week: weekNumber,
    //   value: value,
    //   date: newDate
    // });
    emit('pick', {
      startDate: getDateOfCell(row, 0),
      endDate: getDateOfCell(row, 6),
      selecting: false
    });
  } else if (props.selectionMode === 'dates') {
    // const value = props.value || [];
    // const newValue = cell.selected
    //   ? removeFromArray(value, (date: any) => date.getTime() === newDate.getTime())
    //   : [...value, newDate];
    // emit('pick', newValue);
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
    :class="{ 'is-week-mode': selectionMode === 'week' }"
    @click="handleClick"
    @mousemove="handleMouseMove"
  >
    <tbody>
      <tr>
        <th v-if="false">
          {{ 'WEEK' }}
        </th>
        <th
          v-for="(day, key) in WEEKS"
          :key="key"
        >
          {{ day }}
        </th>
      </tr>
      <tr
        v-for="(row, key) in rows"
        :key="key"
        class="el-date-table__row"
        :class="{ current: isWeekActive(row[1]) }"
      >
        <td
          v-for="(cell, key) in row"
          :key="key"
          :class="getCellClasses(cell)"
        >
          <div>
            <span>{{ cell.text }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@use '@/theme';

.el-date-table {
  font-size: 12px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #f2f6fc
}

.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #f2f6fc
}

.el-date-table.is-week-mode .el-date-table__row:hover td.available:hover {
  color: #2d2926
}

.el-date-table.is-week-mode .el-date-table__row:hover td:first-child div {
  margin-left: 5px;
  // border-top-left-radius: 15px;
  // border-bottom-left-radius: 15px
}

.el-date-table.is-week-mode .el-date-table__row:hover td:last-child div {
  margin-right: 5px;
  // border-top-right-radius: 15px;
  // border-bottom-right-radius: 15px
}

.el-date-table.is-week-mode .el-date-table__row.current div {
  background-color: #f2f6fc
}

.el-date-table td {
  width: 45px;
  height: 30px;
  padding: 4px 0;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  position: relative
}

.el-date-table td div {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box
}

.el-date-table td span {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  // border-radius: 50%
}

.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #c0c4cc
}

.el-date-table td.today {
  position: relative
}

.el-date-table td.today span {
  color: #d0021b;
  font-weight: 700
}

.el-date-table td.today.end-date span,
.el-date-table td.today.start-date span {
  color: #fff
}

.el-date-table td.available:hover {
  color: #d0021b
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover {
  background-color: #f2f6fc
}

.el-date-table td.current:not(.disabled) span {
  color: #fff;
  background-color: #d0021b
}

.el-date-table td.end-date div,
.el-date-table td.start-date div {
  color: #fff
}

.el-date-table td.end-date span,
.el-date-table td.start-date span {
  background-color: #d0021b
}

.el-date-table td.start-date div {
  margin-left: 5px;
  // border-top-left-radius: 15px;
  // border-bottom-left-radius: 15px
}

.el-date-table td.end-date div {
  margin-right: 5px;
  // border-top-right-radius: 15px;
  // border-bottom-right-radius: 15px
}

.el-date-table td.disabled div {
  background-color: #f5f7fa;
  opacity: 1;
  cursor: not-allowed;
  color: #c0c4cc
}

.el-date-table td.selected div {
  margin-left: 5px;
  margin-right: 5px;
  background-color: #f2f6fc;
  // border-radius: 15px
}

.el-date-table td.selected div:hover {
  background-color: #f2f6fc
}

.el-date-table td.selected span {
  background-color: #d0021b;
  color: #fff;
  // border-radius: 15px
}

.el-date-table td.week {
  font-size: 80%;
  color: #2d2926
}

.el-date-table th {
  padding: 5px;
  color: #2d2926;
  font-weight: 400;
  border-bottom: 1px solid #ebeef5
}

.el-date-table td,
.el-date-table th,
.el-month-table td .cell,
.el-picker-panel__icon-btn,
.el-picker-panel__link-btn,
.el-picker-panel__shortcut,
.el-time-panel__btn,
.el-year-table td .cell {
  color: theme.token-as-var('sys.color.content-primary');
}

.el-picker-panel .el-picker-panel__content .el-date-table td.available:hover,
.el-picker-panel .el-picker-panel__content .el-date-table td.today span {
  color: theme.token-as-var('sys.color.status.info')
}

.el-picker-panel .el-picker-panel__content .el-date-table td.next-month,
.el-picker-panel .el-picker-panel__content .el-date-table td.prev-month {
  color: theme.token-as-var('sys.color.content-quaternary')
}

.el-picker-panel .el-picker-panel__content .el-date-table td.current:not(.disabled) span,
.el-picker-panel .el-picker-panel__content .el-date-table td.end-date span,
.el-picker-panel .el-picker-panel__content .el-date-table td.selected span,
.el-picker-panel .el-picker-panel__content .el-date-table td.start-date span {
  background-color: theme.token-as-var('sys.color.status.info');
  color: theme.token-as-var('sys.color.util.surface')
}

.el-picker-panel .el-picker-panel__content .el-date-table th {
  border-bottom-color: theme.token-as-var('sys.color.background-hover');
}

.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div,
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-month-table td.in-range div,
.el-month-table td.in-range div:hover {
  background-color: theme.token-as-var('sys.color.background-hover');
}
</style>