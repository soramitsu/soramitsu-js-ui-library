<script setup lang="ts">
import { computed } from 'vue-demi'
import { SSelectItemType } from './types'
import IconCheckMark from '@soramitsu-ui/icons/icomoon/basic-check-mark-24.svg'
import { useSSelectApi } from './api'

const props = defineProps<{
  type: SSelectItemType
  multiple?: boolean
  selected?: boolean
}>()

const api = useSSelectApi()
const isCheckMode = computed(() => props.type === SSelectItemType.Check)

const emit = defineEmits<(event: 'toggle') => void>()
</script>

<template>
  <div
    :class="['s-select-item', `s-select-item--size-${api.size}`, { 's-select-item--selected': selected }]"
    @click="emit('toggle')"
  >
    <template v-if="!isCheckMode">
      <template v-if="multiple">
        radio
      </template><template v-else>
        check
      </template>
      <template v-if="selected">
        !
      </template>
    </template>
    <div class="s-select-item__content">
      <slot />
    </div>

    <template v-if="isCheckMode">
      <div class="s-select-item__right-check-wrapper">
        <template v-if="selected">
          <IconCheckMark />
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use './sizes-mixin.scss';

.s-select-item {
  @apply bg-utility-surface;
  @apply flex items-center px-2 py-1 select-none cursor-pointer space-x-4;

  &:hover,
  &:active,
  &--selected {
    @apply bg-base-background;
  }

  &__content {
    @apply flex-1;
  }

  &__right-check-wrapper {
    @apply w-6 h-6 flex items-end;
  }

  &--size {
    @include sizes-mixin.s-select-sizes;
  }
}
</style>
