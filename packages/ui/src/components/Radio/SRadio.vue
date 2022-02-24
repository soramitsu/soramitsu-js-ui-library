<script lang="ts">
export default {
  name: 'SRadio',
}
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { useRadioGroupApi } from './api'
import { RadioSize, RADIO_SIZE_VALUES, RadioType, RADIO_TYPE_VALUES } from './types'
import { TYPOGRAPHY } from './const'
import { nextIncrementalCounter } from '@/util'
import SRadioAtom from './SRadioAtom'

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

const tpg = computed(() => TYPOGRAPHY[props.size])

const uniqueLabelId = `sora${nextIncrementalCounter()}`
const uniqueDescriptionId = `sora${nextIncrementalCounter()}`
const describedBy = computed(() => (props.type === 'bordered-with-description' ? uniqueDescriptionId : ''))
</script>

<template>
  <div
    ref="root"
    role="radio"
    :tabindex="api.tabindex"
    :aria-labelledby="uniqueLabelId"
    :aria-describedby="describedBy"
    :aria-checked="api.isChecked"
    :aria-disabled="disabled"
    :class="['s-radio', `s-radio_type_${type}`, `s-radio_size_${size}`]"
    data-testid="radio-button"
    @click="api.check()"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="flex space-x-2 items-center">
      <SRadioAtom
        :size="size"
        :checked="api.isChecked"
        :disabled="disabled"
        :hover="hover"
      />

      <label
        :id="uniqueLabelId"
        :class="tpg.label"
      >
        <slot />
      </label>
    </div>

    <div
      v-if="type === 'bordered-with-description'"
      :id="uniqueDescriptionId"
      :class="[tpg.description, 's-radio__description']"
    >
      <slot name="description" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/theme';

$primary: theme.token-as-var('sys.color.primary');
$on-disabled: theme.token-as-var('sys.color.on-disabled');
$border-primary: theme.token-as-var('sys.color.border-primary');

$dur-easing: 0.2s ease;

.s-radio {
  @apply select-none cursor-pointer rounded;
  padding: 8px 10px;
  transition: all $dur-easing;

  $root: &;

  &[aria-disabled='true'] {
    pointer-events: none;

    label,
    #{$root}__description {
      color: $on-disabled;
    }
  }

  &:focus {
    outline: none;
  }

  label {
    color: theme.token-as-var('sys.color.content-primary');
    @apply cursor-pointer;
  }

  &__description {
    color: theme.token-as-var('sys.color.content-secondary');
    margin-top: 4px;
  }

  label,
  &__description {
    transition: color $dur-easing;
  }

  &[class*='_type_bordered'] {
    border: 1px solid $border-primary;

    &:hover,
    &[aria-checked='true']:not([aria-disabled='true']) {
      border-color: $primary;
    }
  }

  // Styles below doesn't come from design
  // FIXME

  &:hover {
    @apply bg-gray-50;
  }

  &:active {
    @apply bg-gray-100;
  }

  &:focus {
    @apply ring ring-opacity-25 ring-blue-500 ring-offset-2;
  }
}
</style>
