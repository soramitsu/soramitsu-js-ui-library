<script setup lang="ts">
import { computed } from 'vue-demi'
import { useSSelectApi } from './api'
import { SSelectButtonType } from './types'
import SSelectChevron from './SSelectChevron'

const props = withDefaults(
  defineProps<{
    type?: SSelectButtonType
  }>(),
  {
    type: SSelectButtonType.Default,
  },
)

const api = useSSelectApi()

// const label = computed(() => api.label)
// const isMenuOpened = computed(() => api.isMenuOpened)

function toggle() {
  api.menuToggle()
}

const formattedSelectedValue = computed<string | null>(() => {
  const opts = api.selectedOptions
  if (opts.length) {
    if (opts.length === 1) {
      return opts[0].label
    }
    return `${opts.length} selected`
  }
  return null
})
</script>

<template>
  <div
    :class="[
      's-select-btn',
      `s-select-btn--${type}`,
      `s-select-btn--size-${api.size}`,
      {
        's-select-btn--empty': !api.isSomethingSelected,
        's-select-btn--disabled': api.disabled,
      },
    ]"
    @click="toggle"
  >
    <span class="s-select-btn__label">
      <slot
        name="label"
        v-bind="api"
      >
        {{ api.label }}
      </slot>
      <template v-if="api.isSomethingSelected">:</template>
    </span>

    <span
      v-if="api.isSomethingSelected"
      class="s-select-btn__selection"
    >
      {{ formattedSelectedValue }}
    </span>

    <SSelectChevron :rotate="api.isMenuOpened" />
  </div>
</template>

<style lang="scss" scoped>
@use './sizes-mixin.scss';

.s-select-btn {
  $root: &;

  @apply select-none inline-flex items-center space-x-2 cursor-pointer;

  &--default {
    @apply bg-base-background text-base-content-primary rounded px-4;

    &:hover {
      @apply bg-base-background-hover;
    }
  }

  &--inline {
    #{$root}__selection {
      @apply underline underline-solid underline-base-content-primary;
    }

    &:hover#{$root}--empty #{$root}__label {
      text-decoration: underline;
      // @apply underline;
    }
  }

  &--disabled {
    @apply pointer-events-none opacity-75;
  }

  &:not(&--empty) &__label {
    @apply text-base-content-tertiary;
  }

  &--size {
    @include sizes-mixin.s-select-sizes;

    @mixin chevron-size($size, $px) {
      &-#{$size} .s-select-chevron {
        font-size: $px;
      }
    }

    @include chevron-size('sm', 8px);
    @include chevron-size('md', 8px);
    @include chevron-size('lg', 10px);
    @include chevron-size('xl', 16px);
  }
}
</style>
