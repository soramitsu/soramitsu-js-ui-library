<script setup lang="ts">
import { SSpinner } from '../Spinner'
import { BadgeType } from './types'

const props = withDefaults(
  defineProps<{
    type?: BadgeType
    colorBackground?: boolean
    withBorder?: boolean
    onlyMarker?: boolean
  }>(),
  {
    type: 'active',
    colorBackground: false,
    withBorder: false,
    onlyMarker: false,
  },
)

const showSpinner = computed(() => {
  return props.type === 'pending'
})
</script>

<template>
  <div
    tabindex="0"
    :class="[
      's-badge',
      { 's-badge--border': withBorder },
      colorBackground ? `s-badge--color-${type} text-white` : ' text-brand-pms-black',
    ]"
  >
    <div class="flex items-center justify-start">
      <div
        v-if="!showSpinner"
        class="marker"
        :class="!colorBackground ? `s-badge--color-${type}` : 'bg-white'"
      />
      <SSpinner
        v-else
        class="spinner"
      />
      <span
        v-if="!onlyMarker"
        class="title ml-2"
      ><slot /></span>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/theme';
.s-badge {
  @apply cursor-default select-none block;
  border-radius: 30px;
  padding: 5px 10px;
  font-size: 10px;
  font-family: Sora;
  font-style: normal;
  font-weight: bold;
  line-height: 140%;
  width: fit-content;
  letter-spacing: 0.06em;
  font-feature-settings: 'case' on;

  @each $status in ('error', 'warning', 'info') {
    $bg: theme.token-as-var('sys.color.status.#{$status}');
    &--color-#{$status} {
      background-color: $bg;
    }
  }

  &--color-active {
    background-color: theme.token-as-var('sys.color.status.success');
  }

  &--color-debug {
    background-color: theme.token-as-var('sys.color.accent-focused');
  }

  &--color-pending {
    background-color: theme.token-as-var('sys.color.content-tertiary');
  }

  .marker {
    @apply rounded-full;
    width: 8px;
    min-width: 8px;
    height: 8px;
  }

  .spinner {
    width: 10px;
    min-width: 10px;
    height: 10px;
  }

  .title {
    text-transform: uppercase;
  }

  &--border {
    @apply border border-1 border-base-background;
  }
}
</style>
