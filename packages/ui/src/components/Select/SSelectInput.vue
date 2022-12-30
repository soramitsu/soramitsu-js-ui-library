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

function typographyLabel(): string {
  return !api.isSomethingSelected && api.size === SelectSize.Xl ? 'sora-tpg-p3' : 'sora-tpg-p4'
}

function typographySelection(): string {
  return api.size === SelectSize.Xl ? 'sora-tpg-p3' : 'sora-tpg-p4'
}

const FLabel = () => {
  const label = slots.label?.(api) ?? api.label
  return h(
    'span',
    {
      class: ['s-select-input__label', typographyLabel()],
    },
    (!isColumnLayout.value && api.isSomethingSelected ? [label, ':'] : label) as any,
  )
}

const FSelection = () =>
  api.isSomethingSelected
    ? h(
        'span',
        {
          class: ['overflow-hidden', 'overflow-ellipsis', typographySelection()],
        },
        selectionsJoined.value,
      )
    : null
</script>

<template>
  <div
    :class="[
      's-select-input',
      `s-select-input_size_${api.size}`,
      {
        's-select-input_empty': !api.isSomethingSelected,
        's-select-input_disabled': api.disabled || api.loading,
      },
    ]"
    @click="api.menuToggle()"
  >
    <template v-if="isColumnLayout">
      <div class="flex flex-col flex-1 truncate">
        <FLabel />
        <FSelection />
      </div>
    </template>

    <template v-else>
      <div class="flex items-center flex-1 truncate">
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

  &_disabled {
    @apply pointer-events-none opacity-75;
  }

  &:hover {
    background: theme.token-as-var('sys.color.background-hover');
  }

  &__label {
    color: theme.token-as-var('sys.color.content-tertiary');
  }

  &_size {
    @include sizes-mixin.s-select-sizes;

    // chevron sizing

    @mixin chevron-size($size, $px) {
      &_#{$size} .s-select-chevron {
        font-size: $px;
      }
    }

    @include chevron-size('sm', 10px);
    @include chevron-size('md', 12px);
    @include chevron-size('lg', 16px);
    @include chevron-size('xl', 24px);

    @mixin x-paddings($size, $px) {
      &_#{$size} {
        @apply px-#{$px};
      }
    }

    @include x-paddings('sm', 6px);
    @include x-paddings('md', 12px);
    @include x-paddings('lg', 12px);
    @include x-paddings('xl', 16px);
  }

  // magic spacing fix
  &_size_xl:not(&_empty) &__label {
    $magic-spacing-gap-fix: -0.4rem;
    margin-bottom: $magic-spacing-gap-fix;
  }
}
</style>
