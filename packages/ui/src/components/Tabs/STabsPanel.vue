<script lang="ts">
export default defineComponent({
  name: 'STabsPanel',
})
</script>

<script setup lang="ts">
import { TabsPanelApi, TABS_PANEL_API_KEY, BackgroundType } from './api'

const props = withDefaults(
  defineProps<{
    modelValue: string
    background?: BackgroundType
  }>(),
  {
    modelValue: '',
    background: 'primary',
  },
)

const emit = defineEmits(['update:modelValue'])

const selectTab = (tab: string): void => {
  emit('update:modelValue', tab)
}
const active = computed(() => props.modelValue)

const tabState: TabsPanelApi = reactive({
  active: active,
  selectTab,
  background: props.background,
})

provide(TABS_PANEL_API_KEY, tabState)
</script>
<template>
  <div
    role="tablist"
    class="tabs-panel flex items-center justify-start"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tabs-panel {
  &:deep(*:first-child) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:deep(*:last-child) {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
