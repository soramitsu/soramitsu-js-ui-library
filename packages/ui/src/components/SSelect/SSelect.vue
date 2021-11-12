<script setup lang="ts">
import { Option, SSelectOptionType, SSelectSize } from './types'
import SSelectBase from './SSelectBase.vue'
import SSelectInput from './SSelectInput.vue'
import SSelectDropdown from './SSelectDropdown.vue'

const props = defineProps<{
  modelValue?: any
  options?: Option[]
  disabled?: boolean
  multiple?: boolean
  label?: string
  size?: SSelectSize
}>()
</script>

<template>
  <SSelectBase v-bind="{ ...$attrs, ...$props }">
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
      <SSelectDropdown :item-type="SSelectOptionType.RadioOrCheckbox" />
    </template>
  </SSelectBase>
</template>
