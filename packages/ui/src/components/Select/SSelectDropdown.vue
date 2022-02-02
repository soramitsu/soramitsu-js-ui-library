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
@use '@/theme';

.s-select-dropdown {
  @apply rounded overflow-hidden;
  background: theme.token-as-var('sys.color.util.surface');
  box-shadow: theme.token-as-var('sys.shadow.dropdown');
}
</style>
