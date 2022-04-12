<script lang="ts">
export default defineComponent({
  name: 'MonthPanel',
})
</script>

<script setup lang="ts">

const emit = defineEmits(['changeMonth', 'changeYear', 'changeView'])

interface Props {
  currentView: string,
  showMonth: number,
  showYear: number
}

const props = withDefaults(defineProps<Props>(), {
  currentView: 'date',
  showMonth: 0,
  showYear: 0
})

const months = ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

const changeMonth = (delta:number) => {
  let newMonth = props.showMonth + delta;
  if (newMonth > 11) {
    emit('changeMonth', 0);
    emit('changeYear', props.showYear + 1)    
  } else if (newMonth < 0) {
    emit('changeMonth', 11);
    emit('changeYear', props.showYear - 1)   
  } else {
    emit('changeMonth', newMonth)
  }
  return
}


const changeView = (viewName: string) => {
  emit('changeView', viewName)
}


</script>

<template>
  <div
    v-show="currentView !== 'time'"
    class="el-date-picker__header"
    :class="{ 'el-date-picker__header--bordered': currentView === 'year' || currentView === 'month' }"
  >
    <button
      type="button"  
      class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
      @click="changeMonth(-1)"
    />
    <!-- <button
      v-show="currentView === 'date'"              
      type="button"              
      class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
    />         -->
    <span              
      v-show="currentView === 'date'"
      role="button"
      class="el-date-picker__header-label"
      :class="{ active: currentView === 'month' }"
      @click="changeView('months')"
    >{{ months[showMonth] }}</span>
    <span              
      role="button"
      class="el-date-picker__header-label"
      @click="changeView('years')"
    >{{ showYear }}</span>
    <button
      type="button" 
      class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
      @click="changeMonth(1)"
    />
    <!-- <button
      v-show="currentView === 'date'"              
      type="button"              
      class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"
    /> -->
  </div>
</template>

<style lang="scss" scoped>
.el-date-picker__header {
  @apply flex justify-between items-center;
  padding: 12px;
  height: 57px;
}

.el-date-picker__header--bordered {
  margin-bottom: 0;
  // padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5
}

.el-date-picker__header--bordered+.el-picker-panel__content {
  margin-top: 0
}

.el-date-picker__header-label {
  font-size: 16px;
  font-weight: 500;
  padding: 0 5px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  color: #2d2926
}

.el-date-picker__header-label.active,
.el-date-picker__header-label:hover {
  color: #d0021b
}


.el-icon-d-arrow-left:before {
  content: "<"
}

.el-icon-d-arrow-right:before {
  content: '>'
}

.el-icon-arrow-right:before {
  content: ">"
}

.el-icon-arrow-left:before {
  content: "<"
}

.el-picker-panel__icon-btn {
  font-size: 12px;
  color: #303133;
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: none;
  margin-top: 8px
}
</style>