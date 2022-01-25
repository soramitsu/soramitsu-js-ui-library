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
    {
      class: [
        's-select-input__label',
        !api.isSomethingSelected && api.size === SelectSize.Xl ? 'sora-tpg-p3' : 'sora-tpg-p4',
      ],
    },
    (!isColumnLayout.value && api.isSomethingSelected ? [label, ':'] : label) as any,
  )
}
const FSelection = () => (api.isSomethingSelected ? h('span', {}, selectionsJoined.value) : null)
</script>

<template>
  <div
    :class="[
      's-select-input',
      api.size === 'xl' ? 'sora-tpg-p3' : 'sora-tpg-p4',
      {
        's-select-input--empty': !api.isSomethingSelected,
        's-select-input--disabled': api.disabled,
      },
    ]"
    :data-size="api.size"
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
@use '@/theme';

.s-select-input {
  $root: &;

  @apply rounded flex items-center px-4;
  @apply select-none cursor-pointer;

  background: theme.token-as-var('sys.color.background');
  color: theme.token-as-var('sys.color.content-primary');

  &--disabled {
    @apply pointer-events-none opacity-75;
  }

  &:hover {
    background: theme.token-as-var('sys.color.background-hover');
  }

  &__label {
    color: theme.token-as-var('sys.color.content-tertiary');
  }

  &--size {
    @include sizes-mixin.s-select-sizes;
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
