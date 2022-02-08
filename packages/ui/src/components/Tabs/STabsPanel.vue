<script lang="ts">
export default defineComponent({
  name: 'STabsPanel',
})
</script>

<script setup lang="ts">
import { TabsState, TABS_STATE } from './api'

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

const tabState: TabsState = {
  active,
  tabs,
  selectTab,
}

provide(TABS_STATE, tabState)
</script>
<template>
  <div
    role="tablist"
    class="tabs-panel flex items-center justify-start"
  >
    <slot />
  </div>
</template>
