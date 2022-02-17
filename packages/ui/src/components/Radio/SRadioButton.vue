<script setup lang="ts">
import { PropType } from 'vue'
import { RadioButtonSize, RADIO_BUTTON_SIZE } from './const'

const props = defineProps({
  value: {
    type: [Number, String, Symbol, Object],
    required: true,
  },
  bordered: Boolean,
  nude: Boolean,
  hasDescription: Boolean,
  size: {
    type: String as PropType<RadioButtonSize>,
    default: 'sm',
    validate: (value: unknown) => RADIO_BUTTON_SIZE.includes(value as any),
  },
})

// SLOTS

const slots = useSlots()

const isThereSlot = (name: string): boolean => !!slots[name]

// ETC

const tabindex = 0

const descriptionId = '1234'
</script>

<template>
  <div
    role="radio"
    :tabindex="tabindex"
    :aria-describedby="descriptionId"
  >
    <slot />

    <div
      v-if="isThereSlot('description')"
      :id="descriptionId"
    >
      <slot name="description" />
    </div>
  </div>
</template>
