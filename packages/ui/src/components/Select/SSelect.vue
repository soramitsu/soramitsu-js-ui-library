<script setup lang="ts">
import { type SelectOption, type SelectOptionGroup, SelectOptionType, SelectSize } from './types'
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
  // FIXME `triggerSearch` makes sense only in scope of `SSelectBase`
  //        I think here it is better to name it `search-in-input`
  triggerSearch?: boolean
  // FIXME `search-in-dropdown`?
  dropdownSearch?: boolean
  // FIXME `search-external`
  remoteSearch?: boolean
}>()

const defaultOptionType = computed(() => (props.multiple ? SelectOptionType.Checkbox : SelectOptionType.Radio))
</script>

<template>
  <SSelectBase
    v-bind="{ ...$attrs, ...$props } as any"
    same-width-popper
  >
    <!-- FIXME no sense to get `search` from the slot bindings -->
    <template #control="{ search }">
      <SSelectInput
        data-testid="select-trigger"
        :search="search"
      >
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
