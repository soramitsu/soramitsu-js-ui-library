<script setup lang="ts">
import { TOAST_DISPLAY_PLACEMENT_PROP } from './util'
import { ToastsApi, TOASTS_API_KEY } from './api'
import { forceInject } from '@/util'

const props = defineProps({
  placement: TOAST_DISPLAY_PLACEMENT_PROP,
  absolute: Boolean,
  /**
   * Where to teleport it
   */
  to: {
    type: String,
    default: 'body',
  },
  apiKey: {
    type: [String, Symbol],
    default: TOASTS_API_KEY,
  },
})

const api = forceInject<ToastsApi>(props.apiKey)
</script>

<template>
  <Teleport
    :to="to"
    :disabled="!to"
  >
    <div
      class="s-toasts-display"
      :data-placement="placement"
      :data-absolute="absolute"
    >
      <!-- todo add expand transition -->
      <div
        v-for="[key, toast] in api.toasts"
        :key="key"
      >
        <component :is="toast.slot" />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
@mixin define-placement($which-one) {
  &[data-placement='#{$which-one}'] {
    @content;
  }
}

.s-toasts-display {
  @apply p-4 space-y-4;

  &[data-absolute='true'] {
    @apply absolute;
  }

  &:not([data-absolute='true']) {
    @apply fixed;
  }

  @include define-placement('top-right') {
    top: 0;
    right: 0;
  }

  @include define-placement('top-left') {
    top: 0;
    left: 0;
  }

  @include define-placement('bottom-right') {
    bottom: 0;
    right: 0;
  }

  @include define-placement('bottom-left') {
    bottom: 0;
    left: 0;
  }
}
</style>
