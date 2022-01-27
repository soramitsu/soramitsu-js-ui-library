<script setup lang="ts">
import { InjectData } from './types'
import { tabsState as tabsStateKey } from './api'

const props = withDefaults(
  defineProps<{
    modelValue: number
  }>(),
  {
    modelValue: 0,
  },
)

const emit = defineEmits(['update:modelValue'])

const selectTab = (tab: number): void => {
  emit('update:modelValue', tab)
}
const active = computed(() => props.modelValue)
const tabs = ref<any[]>([])

const tabState: InjectData = {
  active,
  tabs,
  selectTab,
}

provide(tabsStateKey, tabState)
</script>
<template>
  <div role="tablist" class="tabs-panel flex items-center justify-start">
    <slot />
  </div>
</template>
