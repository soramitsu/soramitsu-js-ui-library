<script lang="ts">
export default {
  name: 'MonthPanel',
}
</script>

<script setup lang="ts">
import { IconArrowsChevronRight24, IconArrowsChevronLeft24 } from '@/components/icons'
import { months } from './consts'

const emit = defineEmits(['updateShowedState', 'changeView'])

interface Props {
  showMonth: number
  showYear: number
  hideArrows: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showMonth: 0,
  showYear: 0,
  hideArrows: false,
})

const changeMonth = (delta: number) => {
  emit('updateShowedState', delta)
  return
}

const changeView = (viewName: string) => {
  emit('changeView', viewName)
}
</script>

<template>
  <div
    class="header sora-tpg-p1 flex items-center"
    :class="hideArrows ? 'justify-center' : 'justify-between'"
  >
    <button
      v-if="!hideArrows"
      type="button"
      @click="changeMonth(-1)"
    >
      <IconArrowsChevronLeft24 />
    </button>
    <div class="flex justify-center items-center">
      <span
        role="button"
        class="header__label"
        tabIndex="0"
        @click="changeView('months')"
        @keydown="changeView('months')"
      >{{ months[showMonth] }}</span>
      <span
        role="button"
        class="header__label"
        tabIndex="0"
        @click="changeView('years')"
        @keydown="changeView('years')"
      >{{ showYear }}</span>
    </div>
    <button
      v-if="!hideArrows"
      type="button"
      class=""
      @click="changeMonth(1)"
    >
      <IconArrowsChevronRight24 />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme';

.header {
  height: 57px;

  &__label {
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    color: theme.token-as-var('sys.color.content-primary');

    &.active,
    &:hover {
      color: theme.token-as-var('sys.color.primary');
    }
  }
}
</style>
