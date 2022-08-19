<script setup lang="ts">
import { SelectOption, SelectButtonType, SelectOptionType, SelectSize } from './types'
import SSelectBase from './SSelectBase.vue'
import SSelectButton from './SSelectButton.vue'
import SSelectDropdown from './SSelectDropdown.vue'

const props = defineProps<{
  modelValue?: any
  options?: SelectOption[]
  disabled?: boolean
  multiple?: boolean
  label?: string
  size?: SelectSize
  inline?: boolean
  noAutoClose?: boolean
}>()

const buttonType = computed(() => (props.inline ? SelectButtonType.Inline : SelectButtonType.Default))

const slots = useSlots()

function isThereLabelSlot() {
  return !!slots.label
}
</script>

<template>
  <SSelectBase v-bind="{ ...$attrs, ...$props } as any">
    <template #control>
      <SSelectButton :type="buttonType">
        <template
          v-if="isThereLabelSlot() || label"
          #label="binding"
        >
          <slot
            name="label"
            v-bind="binding"
          >
            {{ label }}
          </slot>
        </template>
      </SSelectButton>
    </template>

    <template #dropdown>
      <SSelectDropdown :item-type="SelectOptionType.Check" />
    </template>
  </SSelectBase>
</template>
