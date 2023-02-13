<script setup lang="ts">
import { SelectOption, SelectOptionGroup, SelectOptionType, SelectSize } from './types'
import SSelectBase from './SSelectBase.vue'
import SSelectInput from './SSelectInput.vue'
import SSelectDropdown from './SSelectDropdown.vue'

const props = defineProps<{
  modelValue?: any
  options?: SelectOption[] | SelectOptionGroup[]
  optionType?: SelectOptionType
  disabled?: boolean
  multiple?: boolean
  label?: string
  size?: SelectSize
  noAutoClose?: boolean
  loading?: boolean
  triggerSearch?: boolean
  dropdownSearch?: boolean
  remoteSearch?: boolean
}>()

const defaultOptionType = computed(() => (props.multiple ? SelectOptionType.Checkbox : SelectOptionType.Radio))
</script>

<template>
  <SSelectBase
    v-bind="{ ...$attrs, ...$props } as any"
    same-width-popper
  >
    <template #control="{ search }">
      <SSelectInput :search="search">
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

    <template #dropdown="{ search }">
      <SSelectDropdown
        :search="search"
        :item-type="optionType ?? defaultOptionType"
      >
        <template #empty>
          <slot name="empty" />
        </template>
      </SSelectDropdown>
    </template>
  </SSelectBase>
</template>
