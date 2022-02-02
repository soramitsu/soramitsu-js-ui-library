<script setup lang="ts">
import { useSelectApi } from './api'
import { SelectButtonType } from './types'
import SSelectChevron from './SSelectChevron'

const props = withDefaults(
  defineProps<{
    type?: SelectButtonType
  }>(),
  {
    type: SelectButtonType.Default,
  },
)

const api = useSelectApi()

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
@use '@/theme';
@use './sizes-mixin.scss';

.s-select-btn {
  $root: &;

  @apply select-none inline-flex items-center space-x-2 cursor-pointer;

  &--default {
    background: theme.token-as-var('sys.color.background');
    color: theme.token-as-var('sys.color.content-primary');
    @apply rounded px-4;

    &:hover {
      background: theme.token-as-var('sys.color.background-hover');
    }
  }

  &--inline {
    #{$root}__selection {
      @apply underline underline-solid;
      text-decoration-color: theme.token-as-var('sys.color.content-primary');
    }

    &:hover#{$root}--empty #{$root}__label {
      text-decoration: underline;
    }
  }

  &--disabled {
    @apply pointer-events-none opacity-75;
  }

  &:not(&--empty) &__label {
    color: theme.token-as-var('sys.color.content-tertiary');
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
