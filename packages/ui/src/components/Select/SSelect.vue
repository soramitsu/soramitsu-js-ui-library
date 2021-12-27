<script setup lang="ts">
import { SelectOption, SelectOptionType, SelectSize } from './types'
import SSelectBase from './SSelectBase.vue'
import SSelectInput from './SSelectInput.vue'
import SSelectDropdown from './SSelectDropdown.vue'

defineProps<{
  modelValue?: any
  options?: SelectOption[]
  disabled?: boolean
  multiple?: boolean
  label?: string
  size?: SelectSize
}>()
</script>

<template>
  <SSelectBase v-bind="{ ...$attrs, ...$props } as any">
    <template #control>
      <SSelectInput>
        <template #label="binding">
          <slot
            name="label"
            v-bind="binding"
          >
            {{ label }}
          </slot>
        </template>
      </SSelectInput>
    </template>

    <template #dropdown>
      <SSelectDropdown :item-type="SelectOptionType.RadioOrCheckbox" />
    </template>
  </SSelectBase>
</template>
