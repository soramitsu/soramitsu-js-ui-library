<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { NotificationType } from './types'
import SNotificationBodyTimeline from './SNotificationBodyTimeline.vue'

import IconClose from '@soramitsu-ui/icons/icomoon/basic-close-24.svg'
import IconSuccess from '@soramitsu-ui/icons/icomoon/basic-circle-checked-24.svg'
import IconInfo from '@soramitsu-ui/icons/icomoon/notifications-info-24.svg'
import IconWarning from '@soramitsu-ui/icons/icomoon/notifications-alert-triangle-24.svg'
import IconError from '@soramitsu-ui/icons/icomoon/notifications-x-octagon-24.svg'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    type?: NotificationType
    timeout?: number
    showCloseBtn?: boolean
  }>(),
  {
    type: NotificationType.Info,
    timeout: 0,
  },
)

const ICON_TYPE_MAP: { [K in NotificationType]: Component } = {
  [NotificationType.Info]: IconInfo,
  [NotificationType.Warning]: IconWarning,
  [NotificationType.Error]: IconError,
  [NotificationType.Success]: IconSuccess,
}

const IconViaType = computed(() => ICON_TYPE_MAP[props.type])

const emit = defineEmits<(event: 'click:close' | 'timeout') => void>()

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
    :data-type="type"
  >
    <div class="s-notification-body__spacer">
      <div class="s-notification-body__icon-wrapper">
        <component :is="IconViaType" />
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
@mixin define-icon-color($type) {
  &[data-type='#{$type}'] &__icon-wrapper {
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
