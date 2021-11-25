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
}>()

const buttonType = computed(() => (props.inline ? SelectButtonType.Inline : SelectButtonType.Default))
</script>

<template>
  <SSelectBase v-bind="{ ...$attrs, ...$props }">
    <template #control>
      <SSelectButton :type="buttonType">
        <template #label="binding">
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
