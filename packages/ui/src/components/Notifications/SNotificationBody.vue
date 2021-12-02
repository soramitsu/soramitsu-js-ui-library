<script setup lang="ts">
import { computed } from 'vue'
import { Status } from '@/types'
import SNotificationBodyTimeline from './SNotificationBodyTimeline.vue'
import { IconClose, STATUS_ICONS_MAP } from '@/components/icons'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    status?: Status
    timeout?: number
    showCloseBtn?: boolean
  }>(),
  {
    status: Status.Info,
    timeout: 0,
  },
)

const StatusIcon = computed(() => STATUS_ICONS_MAP[props.status])

const emit = defineEmits(['click:close', 'timeout'])

function onClickClose() {
  emit('click:close')
}

function onTimeout() {
  emit('timeout')
}
</script>

<template>
  <div
    class="s-notification-body"
    :data-status="status"
  >
    <div class="s-notification-body__spacer">
      <div class="s-notification-body__icon-wrapper">
        <component :is="StatusIcon" />
      </div>

      <div class="s-notification-body__content">
        <div class="s-notification-body__title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div class="s-notification-body__description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </div>

      <div class="s-notification-body__close-wrapper">
        <button
          v-if="showCloseBtn"
          data-testid="close-btn"
          @click="onClickClose"
        >
          <IconClose />
        </button>
      </div>
    </div>

    <SNotificationBodyTimeline
      :timeout="timeout"
      @timeout="onTimeout"
    />
  </div>
</template>

<style lang="scss">
@mixin define-icon-color($status) {
  &[data-status='#{$status}'] &__icon-wrapper {
    @content;
  }
}

.s-notification-body {
  @apply bg-base-content-primary text-base-on-accent rounded-lg;
  @apply px-6 py-4;

  // for time line
  @apply relative overflow-hidden;

  // fixme
  box-shadow: 0px 68px 80px rgba(24, 24, 29, 0.09), 0px 30.1471px 24.1177px rgba(24, 24, 29, 0.058643),
    0px 12.5216px 10.0172px rgba(24, 24, 29, 0.045), 0px 4.5288px 3.62304px rgba(24, 24, 29, 0.031357);

  &__content {
    @apply flex-1;
  }

  &__spacer {
    @apply flex space-x-4;
  }

  &__title {
    @apply s-ty-p2;
  }

  &__description {
    @apply s-ty-p4;
  }

  @include define-icon-color('success') {
    @apply text-status-success;
  }

  @include define-icon-color('info') {
    @apply text-status-info;
  }

  @include define-icon-color('error') {
    @apply text-status-error;
  }

  @include define-icon-color('warning') {
    @apply text-status-warning;
  }

  // fix for broken sora icons
  &__close-wrapper svg,
  &__icon-wrapper svg {
    fill: currentColor;
  }
}
</style>
