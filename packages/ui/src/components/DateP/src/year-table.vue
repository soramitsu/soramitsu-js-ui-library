<script setup lang="ts">
// import { hasClass } from 'element-ui/src/utils/dom';
import { isDate, range, nextDate, getDayCountOfYear } from './utils/date-util'
import { arrayFindIndex, coerceTruthyValueToArray } from './utils/utils'
const datesInYear = (year: number) => {
  const numOfDays = getDayCountOfYear(year)
  const firstDay = new Date(year, 0, 1)
  return range(numOfDays).map((n) => nextDate(firstDay, n))
}

const emit = defineEmits(['pick'])

interface Props {
  // disabledDate: Date,
  value: any
  // defaultValue: any,
  date: Date
}

const props = withDefaults(defineProps<Props>(), {})

const deltaDecade = ref(0)

const changeDecade = (delta: number) => {
  deltaDecade.value += delta;
}

const startYear = computed(() => {
  return (Math.floor(props.value / 10) + deltaDecade.value) * 10
})



const getCellStyle = (year: number) => {
  const style = {}
  const today = new Date()
  // style.disabled = typeof this.disabledDate === 'function'
  //   ? datesInYear(year).every(this.disabledDate)
  //   : false;
  // style.current = arrayFindIndex(coerceTruthyValueToArray(props.value), date => date.getFullYear() === year) >= 0;
  style.current = year === props.value
  style.today = today.getFullYear() === year
  // style.default = this.defaultValue && this.defaultValue.getFullYear() === year;
  return style
}
const handleYearTableClick = (event: any) => {
  const target = event.target
  if (target.tagName === 'A') {
    // if (hasClass(target.parentNode, 'disabled')) return;
    const year = target.textContent || target.innerText
    emit('pick', Number(year))
  }
}
</script>

<template>
  <div class="flex justify-between items-center">
     <button
      type="button"  
      class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
      @click="changeDecade(-1)"
    />
    <p>{{`${startYear} - ${startYear + 9 }`}}</p>
    <button
      type="button" 
      class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
      @click="changeDecade(1)"
    />
  </div>
  <table
    class="el-year-table"
    @click="handleYearTableClick"
  >
    <tbody>
      <tr>
        <td
          class="available"
          :class="getCellStyle(startYear + 0)"
        >
          <a class="cell">{{ startYear }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 1)"
        >
          <a class="cell">{{ startYear + 1 }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 2)"
        >
          <a class="cell">{{ startYear + 2 }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 3)"
        >
          <a class="cell">{{ startYear + 3 }}</a>
        </td>
      </tr>
      <tr>
        <td
          class="available"
          :class="getCellStyle(startYear + 4)"
        >
          <a class="cell">{{ startYear + 4 }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 5)"
        >
          <a class="cell">{{ startYear + 5 }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 6)"
        >
          <a class="cell">{{ startYear + 6 }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 7)"
        >
          <a class="cell">{{ startYear + 7 }}</a>
        </td>
      </tr>
      <tr>
        <td
          class="available"
          :class="getCellStyle(startYear + 8)"
        >
          <a class="cell">{{ startYear + 8 }}</a>
        </td>
        <td
          class="available"
          :class="getCellStyle(startYear + 9)"
        >
          <a class="cell">{{ startYear + 9 }}</a>
        </td>
        <td />
        <td />
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.el-year-table {
  font-size: 12px;
  margin: -1px;
  border-collapse: collapse;
}

.el-year-table .el-icon {
  color: #303133;
}

.el-year-table td {
  text-align: center;
  padding: 20px 3px;
  cursor: pointer;
}

.el-year-table td.today .cell {
  color: #d0021b;
  font-weight: 700;
}

.el-year-table td.disabled .cell {
  background-color: #f5f7fa;
  cursor: not-allowed;
  color: #c0c4cc;
}

.el-year-table td.disabled .cell:hover {
  color: #c0c4cc;
}

.el-year-table td .cell {
  width: 48px;
  height: 32px;
  display: block;
  line-height: 32px;
  color: #2d2926;
  margin: 0 auto;
}

.el-year-table td .cell:hover,
.el-year-table td.current:not(.disabled) .cell {
  color: #d0021b;
}

.el-icon-d-arrow-left:before {
  content: "<"
}

.el-icon-d-arrow-right:before {
  content: '>'
}
</style>
