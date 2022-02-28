<script lang="ts">
export default defineComponent({
  name: 'SBadge',
})
</script>

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
    class="sora-tpg-ch3"
    :class="[
      's-badge',
      { 's-badge--border': withBorder },
      colorBackground ? `s-badge--color-${type} text-white` : ' primary-text-color',
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
        class="title"
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
  width: fit-content;

  @each $status in ('error', 'warning', 'info', 'debug') {
    $bg: theme.token-as-var('sys.color.status.#{$status}');
    &--color-#{$status} {
      background-color: $bg;
    }
  }

  &--color-active {
    background-color: theme.token-as-var('sys.color.status.success');
  }


  &--color-pending {
    background-color: theme.token-as-var('sys.color.content-tertiary');
  }

  .primary-text-color {
    color: theme.token-as-var('sys.color.content-primary');
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
    margin-left: 8px;
  }

  &--border {
    @apply border border-1 border-base-background;
  }
}
</style>
