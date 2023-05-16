<script setup lang="ts">
import { useSelectApi } from './api'
import { SelectButtonStyle, SelectSize } from './types'
import SSelectChevron from './SSelectChevron'
import { ListboxButton, ListboxLabel } from '@headlessui/vue'

const props = defineProps<{
  label: string
}>()

const api = useSelectApi()

const formattedSelectedValue = computed<string | null>(() => {
  const value = api.modelAsOptions

  if (Array.isArray(value) && value.length) {
    if (value.length) {
      if (value.length === 1) {
        return api.optionGetters.label(value[0]!)
      }
      return `${value.length} selected`
    }
  } else if (value) {
    return api.optionGetters.label(value)
  }
  return null
})

function typography(): string {
  switch (api.size) {
    case SelectSize.Xl:
      return 'sora-tpg-p1'
    case SelectSize.Lg:
      return 'sora-tpg-p3'
    default:
      return 'sora-tpg-p4'
  }
}
</script>

<template>
  <ListboxButton
    v-slot="{ open, disabled }"
    :class="[
      's-select-btn',
      `s-select-btn_${api.buttonStyle}`,
      `s-select-btn_size_${api.size}`,
      typography(),
      {
        's-select-btn_empty': api.isEmptySelection,
        's-select-btn_disabled': disabled,
      },
    ]"
  >
    <ListboxLabel class="s-select-btn__label">
      <template v-if="formattedSelectedValue">
        {{ label }}: <span class="s-select-btn__selection">{{ formattedSelectedValue }}</span>
      </template>
      <template v-else>
        {{ label }}
      </template>
    </ListboxLabel>

    <SSelectChevron :rotate="open" />
  </ListboxButton>
</template>

<style lang="scss" scoped>
@use '@/theme';
@use './sizes-mixin.scss';

.s-select-btn {
  $root: &;

  @apply select-none inline-flex items-center space-x-2 cursor-pointer;

  &_default {
    background: theme.token-as-var('sys.color.background');
    color: theme.token-as-var('sys.color.content-primary');
    @apply rounded px-4;

    &:hover {
      background: theme.token-as-var('sys.color.background-hover');
    }
  }

  &__selection {
    color: theme.token-as-var('sys.color.content-primary');
  }

  &_inline {
    #{$root}__selection {
      @apply underline underline-solid;
      text-decoration-color: theme.token-as-var('sys.color.content-primary');
    }

    &:hover#{$root}_empty #{$root}__label {
      text-decoration: underline;
    }
  }

  &_disabled {
    @apply pointer-events-none opacity-75;
  }

  &:not(&_empty) &__label {
    color: theme.token-as-var('sys.color.content-tertiary');
  }

  &_size {
    @include sizes-mixin.s-select-sizes;

    @mixin chevron-size($size, $px) {
      &_#{$size} .s-select-chevron {
        font-size: $px;
      }
    }

    @include chevron-size('sm', 8px);
    @include chevron-size('md', 8px);
    @include chevron-size('lg', 10px);
    @include chevron-size('xl', 16px);

    @mixin x-paddings($size, $px) {
      &_#{$size} {
        @apply px-#{$px};
      }
    }

    @include x-paddings('sm', 6px);
    @include x-paddings('md', 10px);
    @include x-paddings('lg', 16px);
    @include x-paddings('xl', 24px);
  }

  &:focus-visible,
  &:focus {
    outline: 2px solid theme.token-as-var('sys.color.primary-outline');
  }
}
</style>
