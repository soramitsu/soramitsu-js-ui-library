<script setup lang="ts">
import { IconArrowsChevronRightXs24 } from '@/components/icons'
</script>

<template>
  <button class="s-table-cell-details w-full h-full flex flex-col justify-center cursor-pointer">
    <IconArrowsChevronRightXs24 class="s-table-cell-details__icon self-center" />
  </button>
</template>

<style lang="scss">
@use '@/theme';

.s-table-cell-details {
  &:hover {
    background: theme.token-as-var('ref.color.button.color-base-content-secondary');
  }

  &__icon {
    color: theme.token-as-var('sys.color.content-tertiary-active');
    fill: currentColor;
  }

  &:hover &__icon {
    color: theme.token-as-var('sys.color.button.secondary.text-color');
  }
}
</style>
