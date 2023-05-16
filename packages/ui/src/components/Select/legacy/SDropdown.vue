<script setup lang="ts">
import { type SelectOption, SelectButtonType, SelectOptionStyle, SelectSize, type SelectOptionGroup } from './types'
import SSelectBase from './SSelectBase.vue'
import SSelectButton from './SSelectButton.vue'
import SSelectDropdown from './SSelectDropdown.vue'

const props = defineProps<{
  modelValue?: any
  options?: SelectOption[] | SelectOptionGroup[]
  optionType?: SelectOptionStyle
  disabled?: boolean
  multiple?: boolean
  label?: string
  size?: SelectSize
  noAutoClose?: boolean
  loading?: boolean
  inline?: boolean
  searchInDropdown?: boolean
  searchExternal?: boolean
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
      <SSelectButton
        data-testid="select-trigger"
        :type="buttonType"
      >
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
      <SSelectDropdown
        :search="searchInDropdown"
        :item-type="optionType ?? SelectOptionStyle.Default"
      >
        <template #empty>
          <slot name="empty" />
        </template>
      </SSelectDropdown>
    </template>
  </SSelectBase>
</template>
