<script setup lang="ts">
import { computed } from 'vue-demi'
import { useSSelectApi } from './api'
import { SSelectButtonType } from './types'
import IconChevronBottom from '@soramitsu-ui/icons/icomoon/chevron-bottom-16.svg'

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
    v-if="type === SSelectButtonType.Default"
    :class="[
      's-select-btn s-select-btn--default',
      `s-select-btn--size-${api.size}`,
      {
        's-select-btn--non-empty': api.isSomethingSelected,
      },
    ]"
    @click="toggle"
  >
    <span class="s-select-btn__label">
      <slot name="label">
        {{ api.label }}
      </slot>
      <template v-if="api.isSomethingSelected">:</template>
    </span>

    <span>
      <template v-if="api.isSomethingSelected"> {{ formattedSelectedValue }} </template>
    </span>

    <IconChevronBottom
      :class="{
        'transform rotate-180': api.isMenuOpened,
      }"
    />
  </div>

  <span v-else>
    <span><slot name="label">{{ api.label }}</slot></span>
  </span>
</template>

<style lang="scss" scoped>
@use './sizes-mixin.scss';

.s-select-btn {
  @apply select-none flex items-center space-x-2 cursor-pointer;

  &--default {
    @apply bg-base-background text-base-content-primary rounded px-2 py-1;

    &:hover {
      @apply bg-base-background-hover;
    }
  }

  &--non-empty &__label {
    @apply text-base-content-tertiary;
  }

  &--size {
    @include sizes-mixin.s-select-sizes;
  }
}
</style>
