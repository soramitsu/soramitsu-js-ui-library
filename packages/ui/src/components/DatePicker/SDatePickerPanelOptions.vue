<script setup lang="ts">
import { DatePickerOptions } from './types'
import { IconBasicCheckMark24 } from '@/components/icons'
import { DatePickerApi, useDatePickerApi } from './api'

type Props = {
  menuState: string
  options: DatePickerOptions
}

const props = defineProps<Props>()

const emit = defineEmits(['click:option'])

const state: DatePickerApi = useDatePickerApi()

const onMenuClick = (data: Date | [Date, Date] | Date[], label: string) => {
  emit('click:option', data, label)
}

const finalOptions = computed((): Required<DatePickerOptions> => {
  return {
    day: props.options.day ?? [],
    range: props.options.range ?? [],
    pick: props.options.pick ?? [],
  }
})
</script>

<template>
  <div
    v-if="state.type !== 'pick'"
    class="s-date-picker-options-panel sora-tpg-p3"
  >
    <p
      v-for="(item, idx) in finalOptions[state.type]"
      :key="idx"
      class="s-date-picker-options-panel__item"
      :class="menuState === item.label ? 'active' : ''"
      @click="onMenuClick(item.value, item.label)"
      @keydown="onMenuClick(item.value, item.label)"
    >
      {{ item.label }}
      <span
        v-show="menuState === item.label"
        class="s-date-picker-options-panel__checkmark"
      ><IconBasicCheckMark24 /></span>
    </p>
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-date-picker-options-panel {
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
</style>
