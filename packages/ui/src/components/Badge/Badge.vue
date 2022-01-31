<script setup lang="ts">
import { SSpinner } from '../Spinner'

type BdgType = 'active' | 'error' | 'warning' | 'info' | 'debug' | 'pending'

const props = withDefaults(
  defineProps<{
    type?: BdgType
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
    class=""
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

  &--color-active {
    @apply bg-status-success;
  }

  &--color-error {
    @apply bg-status-error;
  }

  &--color-warning {
    @apply bg-status-warning;
  }

  &--color-info {
    @apply bg-status-info;
  }

  &--color-debug {
    @apply bg-accent-focused;
  }

  &--color-pending {
    @apply bg-base-content-tertiary;
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
