<script setup lang="ts">
import { RangeOptionValue } from './types'
import { IconBasicCheckMark24 } from '@/components/icons'
import OptionsWrapper from './SDatePickerOptionsWrapper.vue'
import { DatePickerApi, useDatePickerApi } from './api'

interface Props {
  menuState: string
}

const props = defineProps<Props>()

const emit = defineEmits(['onOptionClick'])

const state: DatePickerApi = useDatePickerApi()
const { type } = state

const onMenuClick = (data: Date | RangeOptionValue, label: string) => {
  emit('onOptionClick', data, label)
}
</script>

<template>
  <div
    v-if="type != 'pick'"
    class="s-date-picker-options-panel sora-tpg-p3"
  >
    <OptionsWrapper v-slot="{ options }">
      <p
        v-for="(item, idx) in options[type]"
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
    </OptionsWrapper>
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
