<script lang="ts">
export default defineComponent({
  name: 'SSelectOption',
})
</script>

<script setup lang="ts">
import { SelectOptionType } from './types'
import IconCheckMark from '~icons/mdi/check'
import { useSelectApi } from './api'

const props = defineProps<{
  type: SelectOptionType
  multiple?: boolean
  selected?: boolean
}>()

const api = useSelectApi()
const isCheckMode = computed(() => props.type === SelectOptionType.Check)

const emit = defineEmits<(event: 'toggle') => void>()
</script>

<template>
  <div
    :class="[
      's-select-option',
      `s-select-option_size_${api.size}`,
      {
        's-select-option_selected': selected,
      },
    ]"
    @click="emit('toggle')"
  >
    <template v-if="!isCheckMode">
      <!-- FIXME checkbox & radio -->
      <template v-if="multiple">
        checkbox
      </template>
      <template v-else>
        radio
      </template>
      <template v-if="selected">
        !
      </template>
    </template>
    <div class="s-select-option__content">
      <slot />
    </div>

    <template v-if="isCheckMode">
      <div class="s-select-option__right-check-wrapper">
        <template v-if="selected">
          <IconCheckMark />
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use './sizes-mixin.scss';
@use '@/theme';

.s-select-option {
  background: theme.token-as-var('sys.color.util.surface');
  @apply flex items-center px-[10px] py-1 select-none cursor-pointer space-x-4;

  &:hover,
  &:active,
  &_selected {
    background: theme.token-as-var('sys.color.background');
  }

  &__content {
    @apply flex-1;
  }

  &__right-check-wrapper {
    @apply w-6 h-6 flex items-center justify-center;
  }

  $root: &;

  &_size {
    @include sizes-mixin.s-select-sizes;

    @mixin check-size($size, $px: 16px) {
      &_#{$size} #{$root}__right-check-wrapper {
        font-size: $px;
      }
    }

    @include check-size('sm');
    @include check-size('md');
    @include check-size('lg');
    @include check-size('xl', 24px);
  }
}
</style>
