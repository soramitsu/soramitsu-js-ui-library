<script setup lang="ts">
import { PropType } from 'vue'
import { useRadioGroupApi } from './api'
import { RadioButtonSize, RADIO_BUTTON_SIZE, RadioButtonType, RADIO_BUTTON_TYPE } from './types'
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
    type: String as PropType<RadioButtonType>,
    default: 'default',
    validate: (value: any) => RADIO_BUTTON_TYPE.includes(value),
  },
  size: {
    type: String as PropType<RadioButtonSize>,
    default: 'sm',
    validate: (value: unknown) => RADIO_BUTTON_SIZE.includes(value as any),
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
    :class="['s-radio-button', `s-radio-button_type_${type}`, `s-radio-button_size_${size}`]"
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
      :class="[tpg.description, 's-radio-button__description']"
    >
      <slot name="description" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/theme';

$primary: theme.token-as-var('sys.color.primary');
$border-primary: theme.token-as-var('sys.color.border-primary');

.s-radio-button {
  @apply select-none cursor-pointer rounded;
  padding: 8px 10px;

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

  &[class*='_type_bordered'] {
    border: 1px solid $border-primary;

    &:hover,
    &[aria-checked='true'] {
      border-color: $primary;
    }
  }

  &_type_default {
    &:hover {
      @apply bg-gray-100;
    }

    &:focus,
    &:active {
      @apply bg-gray-300;
    }
  }
}
</style>
