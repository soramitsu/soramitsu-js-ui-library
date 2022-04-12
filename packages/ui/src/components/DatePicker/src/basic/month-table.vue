<script setup lang="ts">

//  import Locale from 'element-ui/src/mixins/locale';
  import { isDate, range, getDayCountOfMonth, nextDate } from '../date-util';
  // import { hasClass } from 'element-ui/src/utils/dom';
  import { arrayFindIndex, coerceTruthyValueToArray, arrayFind } from '../utils';

  const datesInMonth = (year: number, month: number) => {
    const numOfDays = getDayCountOfMonth(year, month);
    const firstDay = new Date(year, month, 1);
    return range(numOfDays).map(n => nextDate(firstDay, n));
  };
  const clearDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth());
  };
  const getMonthTimestamp = function(time : any) {
    if (typeof time === 'number' || typeof time === 'string') {
      return clearDate(new Date(time)).getTime();
    } else if (time instanceof Date) {
      return clearDate(time).getTime();
    } else {
      return NaN;
    }
  };

  interface Props {
    disabledDate: Date,
    value: any,
    selectionMode: 'day' | 'dates' | 'week' | 'range',
  minDate: Date,
  maxDate: Date,
  defaultValue: any,
  date: Date,
  rangeState: any,

}

const props = withDefaults(defineProps<Props>(), {
})

const months = ref(['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']);
        let tableRows = ref([ [], [], [] ]);
        let lastRow = ref(0);
        let lastColumn = ref(0);
  // export default {
  //   props: {
  //     disabledDate: {},
  //     value: {},
  //     selectionMode: {
  //       default: 'month'
  //     },
  //     minDate: {},
  //     maxDate: {},
  //     defaultValue: {
  //       validator(val) {
  //         // null or valid Date Object
  //         return val === null || isDate(val) || (Array.isArray(val) && val.every(isDate));
  //       }
  //     },
  //     date: {},
  //     rangeState: {
  //       default() {
  //         return {
  //           endDate: null,
  //           selecting: false
  //         };
  //       }
  //     }
  //   },
  //   mixins: [Locale],
    // watch: {
    //   'rangeState.endDate'(newVal) {
    //     this.markRange(this.minDate, newVal);
    //   },
    //   minDate(newVal, oldVal) {
    //     if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
    //       this.markRange(this.minDate, this.maxDate);
    //     }
    //   },
    //   maxDate(newVal, oldVal) {
    //     if (getMonthTimestamp(newVal) !== getMonthTimestamp(oldVal)) {
    //       this.markRange(this.minDate, this.maxDate);
    //     }
    //   }
    // },
    // data() {
    //   return {
    //     months: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    //     tableRows: [ [], [], [] ],
    //     lastRow: null,
    //     lastColumn: null
    //   };
    // },

      const cellMatchesDate = (cell: any, date: Date) => {
        const value = new Date(date);
        return props.date.getFullYear() === value.getFullYear() && Number(cell.text) === value.getMonth();
      };
      const getCellStyle = (cell: any) => {
        const style = {      
        };
        const year = props.date.getFullYear();
        const today = new Date();
        const month = cell.text;
        const defaultValue = props.defaultValue ? Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue] : [];
        style.disabled = typeof props.disabledDate === 'function'
          ? datesInMonth(year, month).every(props.disabledDate)
          : false;
        style.current = arrayFindIndex(coerceTruthyValueToArray(props.value), (date : any) => date.getFullYear() === year && date.getMonth() === month) >= 0;
        style.today = today.getFullYear() === year && today.getMonth() === month;
        style.default = defaultValue.some(date => cellMatchesDate(cell, date));
        if (cell.inRange) {
          style['in-range'] = true;
          if (cell.start) {
            style['start-date'] = true;
          }
          if (cell.end) {
            style['end-date'] = true;
          }
        }
        return style;
      };
      const getMonthOfCell = (month: any) => {
        const year = props.date.getFullYear();
        return new Date(year, month, 1);
      };
      const markRange = (minDate: any, maxDate: any) => {
        let minDateMonthTimestamp = getMonthTimestamp(minDate);
        let maxDateMonthTimestamp = getMonthTimestamp(maxDate) || minDate;
        [minDateMonthTimestamp, maxDateMonthTimestamp] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
        // const rows = rows;
        for (let i = 0, k = rows.values.length; i < k; i++) {
          const row = rows.values[i];
          for (let j = 0, l = row.length; j < l; j++) {
            const cell = row[j];
            const index = i * 4 + j;
            const time = new Date(props.date.getFullYear(), index).getTime();
            cell.inRange = minDate && time >= minDate && time <= maxDate;
            cell.start = minDate && time === minDate;
            cell.end = maxDate && time === maxDate;
          }
        }
      };
      const handleMouseMove = (event: any) => {
        if (!props.rangeState.selecting) return;
        let target = event.target;
        if (target.tagName === 'A') {
          target = target.parentNode.parentNode;
        }
        if (target.tagName === 'DIV') {
          target = target.parentNode;
        }
        if (target.tagName !== 'TD') return;
        const row = target.parentNode.rowIndex;
        const column = target.cellIndex;
        // can not select disabled date
        if (rows.values[row][column].disabled) return;
        // only update rangeState when mouse moves to a new cell
        // this avoids frequent Date object creation and improves performance
        if (row !== lastRow || column !== lastColumn) {
          lastRow = row;
          lastColumn = column;
          emit('changerange', {
            minDate: props.minDate,
            maxDate: props.maxDate,
            rangeState: {
              selecting: true,
              endDate: getMonthOfCell(row * 4 + column)
            }
          });
        }
      };
      const handleMonthTableClick = (event: any) => {
        let target = event.target;
        if (target.tagName === 'A') {
          target = target.parentNode.parentNode;
        }
        if (target.tagName === 'DIV') {
          target = target.parentNode;
        }
        if (target.tagName !== 'TD') return;
        if (hasClass(target, 'disabled')) return;
        const column = target.cellIndex;
        const row = target.parentNode.rowIndex;
        const month = row * 4 + column;
        const newDate = getMonthOfCell(month);
        if (props.selectionMode === 'range') {
          if (!props.rangeState.selecting) {
            emit('pick', {minDate: newDate, maxDate: null});
            props.rangeState.selecting = true;
          } else {
            if (newDate >= props.minDate) {
              emit('pick', {minDate: props.minDate, maxDate: newDate});
            } else {
              emit('pick', {minDate: newDate, maxDate: props.minDate});
            }
            props.rangeState.selecting = false;
          }
        } else {
          emit('pick', month);
        }
      }


      const rows: any = computed(() => {
        // TODO: refactory rows / getCellClasses
        const rows = tableRows;
        const disabledDate = props.disabledDate;
        const selectedDate: any[] = [];
        const now = getMonthTimestamp(new Date());
        for (let i = 0; i < 3; i++) {
          const row = rows.value[i];
          for (let j = 0; j < 4; j++) {
            let cell = row[j];
            if (!cell) {
              cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
            }
            cell.type = 'normal';
            const index = i * 4 + j;
            const time = new Date(props.date.getFullYear(), index).getTime();
            cell.inRange = time >= getMonthTimestamp(props.minDate) && time <= getMonthTimestamp(props.maxDate);
            cell.start = props.minDate && time === getMonthTimestamp(props.minDate);
            cell.end = props.maxDate && time === getMonthTimestamp(props.maxDate);
            const isToday = time === now;
            if (isToday) {
              cell.type = 'today';
            }
            cell.text = index;
            let cellDate = new Date(time);
            cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
            cell.selected = arrayFind(selectedDate, (date: any) => date.getTime() === cellDate.getTime());
            this.$set(row, j, cell);
          }
        }
        return rows;
      })

</script>


<template>
  <table @click="handleMonthTableClick" @mousemove="handleMouseMove" class="el-month-table">
    <tbody>
    <tr v-for="(row, key) in rows" :key="key">
      <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
        <div>
          <a class="cell">{{ t('el.datepicker.months.' + months[cell.text]) }}</a>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>