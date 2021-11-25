<script setup lang="ts">
import { useSelectApi } from './api'
import { SelectSize } from './types'
import SSelectChevron from './SSelectChevron'

const slots = useSlots()
const api = useSelectApi()

const selectionsJoined = computed<string>(() => api.selectedOptions.map((x) => x.label).join(', '))

/**
 * Column layout - when label is on top of the selection.
 * Non-column: `<label>: <selection>`
 */
const isColumnLayout = computed<boolean>(() => {
  return api.size === SelectSize.Xl
})

const FLabel = () => {
  const label = slots.label?.(api) ?? api.label
  return h(
    'span',
    { class: 's-select-input__label' },
    !isColumnLayout.value && api.isSomethingSelected ? [label, ':'] : label,
  )
}
const FSelection = () => (api.isSomethingSelected ? h('span', {}, selectionsJoined.value) : null)
</script>

<template>
  <div
    :class="[
      's-select-input',
      `s-select-input--size-${api.size}`,
      {
        's-select-input--empty': !api.isSomethingSelected,
        's-select-input--disabled': api.disabled,
      },
    ]"
    @click="api.menuToggle()"
  >
    <template v-if="isColumnLayout">
      <div class="flex flex-col flex-1">
        <FLabel />
        <FSelection />
      </div>
    </template>

    <template v-else>
      <div class="flex-1">
        <FLabel /> <FSelection />
      </div>
    </template>

    <div>
      <SSelectChevron :rotate="api.isMenuOpened" />
    </div>
  </div>
</template>

<style lang="scss">
@use './sizes-mixin.scss';

.s-select-input {
  $root: &;

  @apply bg-base-background text-base-content-primary rounded flex items-center px-4;
  @apply select-none cursor-pointer;

  &--disabled {
    @apply pointer-events-none opacity-75;
  }

  &:hover {
    @apply bg-base-background-hover;
  }

  &__label {
    @apply text-base-content-tertiary;
  }

  &--size {
    @include sizes-mixin.s-select-sizes;
  }

  &--size-sm,
  &--size-md,
  &--size-lg,
  &--size-xl &__label {
    @apply s-ty-p4;
  }

  &--size-xl#{&}--empty &__label,
  &--size-xl {
    @apply s-ty-p3;
  }

  &--size-xl:not(&--empty) &__label {
    $magic-spacing-gap-fix: -0.4rem;
    margin-bottom: $magic-spacing-gap-fix;
  }

  // chevron sizing
  @mixin chevron-size($size, $px) {
    &--size-#{$size} .s-select-chevron {
      font-size: $px;
    }
  }

  @include chevron-size('sm', 10px);
  @include chevron-size('md', 12px);
  @include chevron-size('lg', 16px);
  @include chevron-size('xl', 24px);
}
</style>
