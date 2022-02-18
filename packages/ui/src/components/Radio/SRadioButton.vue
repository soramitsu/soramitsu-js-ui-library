<script setup lang="ts">
import { PropType } from 'vue'
import { useRadioGroupApi } from './api'
import { RadioButtonSize, RADIO_BUTTON_SIZE } from './const'
import SRadioAtom from './SRadioAtom'
import { nextIncrementalCounter } from '@/util'

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

const api = useRadioGroupApi().registerRadio({
  valueRef: computed(() => props.value),
  elRef: templateRef('root'),
})

// SLOTS

const slots = useSlots()

const isThereSlot = (name: string): boolean => !!slots[name]

// ETC

const tabindex = computed(() => (api.isTabbable ? 0 : -1))

const descriptionId = `SRadioButtonDescription${nextIncrementalCounter()}`
</script>

<template>
  <div
    ref="root"
    role="radio"
    :tabindex="tabindex"
    :aria-checked="api.isChecked"
    :aria-describedby="descriptionId"
    class="m-4 border-2 rounded p-2 cursor-pointer focus:ring ring-dark-300"
    @click="api.check()"
  >
    <SRadioAtom
      size="md"
      :checked="api.isChecked"
    />

    <slot />

    <div
      v-if="isThereSlot('description')"
      :id="descriptionId"
    >
      <slot name="description" />
    </div>
  </div>
</template>
