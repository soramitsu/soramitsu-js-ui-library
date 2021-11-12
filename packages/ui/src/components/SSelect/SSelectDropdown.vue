<script setup lang="ts">
import { useSSelectApi } from './api'
import { SSelectOptionType } from './types'
import SSelectOption from './SSelectOption.vue'

defineProps<{
  itemType: SSelectOptionType
}>()

const api = useSSelectApi()
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
