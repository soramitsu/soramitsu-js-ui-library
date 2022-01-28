<script setup lang="ts">
import { eagerComputed } from '@vueuse/core'
import { IconClose, STATUS_ICONS_MAP } from '@/components/icons'
import { Status } from '@/types'

interface Props {
  inline?: boolean
  status?: Status
  showCloseBtn?: boolean
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: Status.Info,
  showCloseBtn: false,
})

const emit = defineEmits<(event: 'click:close') => void>()

const StatusIcon = eagerComputed(() => STATUS_ICONS_MAP[props.status])

function onClickClose() {
  emit('click:close')
}
</script>

<template>
  <div class="s-alert" :data-status="status" :data-inline="inline">
    <div class="s-alert__icon-wrapper">
      <component :is="StatusIcon" />
    </div>

    <div class="s-alert__content">
      <div class="s-alert__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <div class="s-alert__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>

    <div v-if="showCloseBtn" class="s-alert__close-wrapper">
      <button data-testid="close-btn" @click="onClickClose">
        <IconClose />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.s-alert {
  @apply rounded border border-solid;
  @apply px-6 py-4;
  @apply flex space-x-4;
  @apply text-base-content-primary;

  @mixin status($x) {
    &[data-status='#{$x}'] {
      @content;
    }
  }

  @mixin status-icon($x) {
    &[data-status='#{$x}'] &__icon-wrapper {
      @content;
    }
  }

  @include status('info') {
    @apply bg-status-background-info border-status-info;
  }
  @include status-icon('info') {
    @apply text-status-info;
  }
  @include status('error') {
    @apply bg-status-background-error border-status-error;
  }
  @include status-icon('error') {
    @apply text-status-error;
  }
  @include status('warning') {
    @apply bg-status-background-warning border-status-warning;
  }
  @include status-icon('warning') {
    @apply text-status-warning;
  }
  @include status('success') {
    @apply bg-status-background-success border-status-success;
  }
  @include status-icon('success') {
    @apply text-status-success;
  }

  &__content {
    @apply flex-1;
  }

  &__title {
    @apply s-ty-h5;
  }

  &__description {
    @apply s-ty-p3;
  }

  &__icon-wrapper svg,
  &__close-wrapper svg {
    fill: currentColor;
  }
}
</style>
