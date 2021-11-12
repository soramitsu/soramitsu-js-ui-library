<script setup lang="ts">
import { computed } from 'vue'
import { Option, SSelectButtonType, SSelectOptionType, SSelectSize } from './types'
import SSelectBase from './SSelectBase.vue'
import SSelectButton from './SSelectButton.vue'
import SSelectDropdown from './SSelectDropdown.vue'

const props = defineProps<{
  modelValue?: any
  options?: Option[]
  disabled?: boolean
  multiple?: boolean
  label?: string
  size?: SSelectSize
  inline?: boolean
}>()

const buttonType = computed(() => (props.inline ? SSelectButtonType.Inline : SSelectButtonType.Default))
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
      <SSelectDropdown :item-type="SSelectOptionType.Check" />
    </template>
  </SSelectBase>
</template>
