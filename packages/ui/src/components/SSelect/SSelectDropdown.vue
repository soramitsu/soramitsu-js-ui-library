<script setup lang="ts">
import { useSSelectApi } from './api'
import { SSelectItemType } from './types'
import SSelectItem from './SSelectItem.vue'

defineProps<{
  itemType: SSelectItemType
}>()

const api = useSSelectApi()
</script>

<template>
  <div class="s-select-dropdown">
    <SSelectItem
      v-for="(opt, i) in api.options"
      :key="i"
      :type="itemType"
      :multiple="api.multiple"
      :selected="api.isValueSelected(opt.value)"
      @toggle="api.toggleSelection(opt.value)"
    >
      {{ opt.label }}
    </SSelectItem>
  </div>
</template>

<style lang="scss">
.s-select-dropdown {
  @apply bg-utility-surface rounded overflow-hidden shadow-dropdown;
}
</style>
