<script setup lang="ts">
import { useSelectApi } from './api'
import { SelectOptionType, SelectSize } from './types'
import SSelectOption from './SSelectOption.vue'

defineProps<{
  itemType: SelectOptionType
}>()

const api = useSelectApi()

const fontClass = computed(() => api.size === SelectSize.Xl ? 'sora-tpg-p3' : 'sora-tpg-p4')
</script>

<template>
  <div class="s-select-dropdown">
    <SSelectOption
      v-for="(opt, i) in api.options"
      :key="i"
      :class="fontClass"
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
