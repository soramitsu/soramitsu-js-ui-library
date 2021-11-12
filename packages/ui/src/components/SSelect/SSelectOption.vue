<script setup lang="ts">
import { computed } from 'vue-demi'
import { SSelectOptionType } from './types'
import IconCheckMark from '~icons/mdi/check'
import { useSSelectApi } from './api'

const props = defineProps<{
  type: SSelectOptionType
  multiple?: boolean
  selected?: boolean
}>()

const api = useSSelectApi()
const isCheckMode = computed(() => props.type === SSelectOptionType.Check)

const emit = defineEmits<(event: 'toggle') => void>()
</script>

<template>
  <div
    :class="[
      's-select-option',
      `s-select-option--size-${api.size}`,
      {
        's-select-option--selected': selected,
      },
    ]"
    @click="emit('toggle')"
  >
    <template v-if="!isCheckMode">
      <template v-if="multiple">
        checkbox
      </template><template v-else>
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

.s-select-option {
  @apply bg-utility-surface;
  @apply flex items-center px-[10px] py-1 select-none cursor-pointer space-x-4;

  &:hover,
  &:active,
  &--selected {
    @apply bg-base-background;
  }

  &__content {
    @apply flex-1;
  }

  &__right-check-wrapper {
    @apply w-6 h-6 flex items-center justify-center;
  }

  $root: &;

  &--size {
    @include sizes-mixin.s-select-sizes;

    @mixin check-size($size, $px) {
      &-#{$size} #{$root}__right-check-wrapper {
        font-size: $px;
      }
    }

    @include check-size('sm', 16px);
    @include check-size('md', 16px);
    @include check-size('lg', 16px);
    @include check-size('xl', 24px);
  }
}
</style>
