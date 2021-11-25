<script setup lang="ts">
import { useSelectApi } from './api'
import { SelectOptionType } from './types'
import SSelectOption from './SSelectOption.vue'

defineProps<{
  itemType: SelectOptionType
}>()

const api = useSelectApi()
</script>

<template>
  <div class="s-select-dropdown">
    <SSelectOption
      v-for="(opt, i) in api.options"
      :key="i"
      :type="itemType"
      :multiple="api.multiple"
      :selected="api.isValueSelected(opt.value)"
      @toggle="api.toggleSelection(opt.value)"
    >
      {{ opt.label }}
    </SSelectOption>
  </div>
</template>

<style lang="scss">
.s-select-dropdown {
  @apply bg-utility-surface rounded overflow-hidden shadow-dropdown;
}
</style>
