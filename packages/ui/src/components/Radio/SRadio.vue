<script lang="ts">
export default {
  name: 'SRadio',
}
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { useRadioGroupApi } from './api'
import { RadioSize, RADIO_SIZE_VALUES, RadioType, RADIO_TYPE_VALUES } from './types'
import { nextIncrementalCounter } from '@/util'
import SRadioAtom from './SRadioAtom'
import SRadioBody from './SRadioBody'

const props = defineProps({
  value: {
    type: [Number, String, Symbol, Object],
    required: true,
  },
  disabled: Boolean,
  type: {
    type: String as PropType<RadioType>,
    default: 'default',
    validate: (value: any) => RADIO_TYPE_VALUES.includes(value),
  },
  size: {
    type: String as PropType<RadioSize>,
    default: 'md',
    validate: (value: unknown) => RADIO_SIZE_VALUES.includes(value as any),
  },
})

const api = useRadioGroupApi().registerRadio({
  valueRef: computed(() => props.value),
  disabledRef: computed(() => props.disabled),
  elRef: templateRef('root'),
})

// ETC

const hover = ref(false)

const uniqueLabelId = `sora${nextIncrementalCounter()}`
const uniqueDescriptionId = `sora${nextIncrementalCounter()}`
const describedBy = computed(() => (props.type === 'bordered-with-description' ? uniqueDescriptionId : ''))
</script>

<template>
  <SRadioBody
    ref="root"
    role="radio"
    :tabindex="api.tabindex"
    :type="type"
    :size="size"
    :label-id="uniqueLabelId"
    :description-id="describedBy"
    :aria-checked="api.isChecked"
    :aria-disabled="disabled"
    data-testid="radio-button"
    class="s-radio"
    @click="api.check()"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <template #atom>
      <SRadioAtom
        :size="size"
        :checked="api.isChecked"
        :disabled="disabled"
        :hover="hover"
      />
    </template>

    <template #label>
      <slot />
    </template>

    <template #description>
      <slot name="description" />
    </template>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      class="iconify iconify--ic"
      width="32"
      height="32"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.29 13.29a.996.996 0 0 1-1.41 0L5.71 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.58 7.59z"
      />
    </svg>
  </SRadioBody>
</template>

<style lang="scss">
@use '@/theme';

.s-radio.s-radio-body {
  $root: &;

  &[aria-disabled='true'] {
    pointer-events: none;

    label,
    .s-radio-body__description {
      color: theme.token-as-var('sys.color.on-disabled');
    }
  }

  &[data-type^='bordered'] {
    &:hover,
    &[aria-checked='true']:not([aria-disabled='true']) {
      border-color: theme.token-as-var('sys.color.primary');
    }
  }
}
</style>
