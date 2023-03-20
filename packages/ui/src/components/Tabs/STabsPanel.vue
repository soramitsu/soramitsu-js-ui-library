<script setup lang="ts">
import { type TabsPanelApi, TABS_PANEL_API_KEY, type TabsPanelBackgroundType } from './api'

const props = withDefaults(
  defineProps<{
    modelValue: string | null
    background?: TabsPanelBackgroundType
  }>(),
  {
    modelValue: '',
    background: 'primary',
  },
)

const emit = defineEmits(['update:modelValue'])

const model = useVModel(props, 'modelValue', emit, { passive: true })

const selectTab = (tab: string | null): void => {
  model.value = tab
}

const api: TabsPanelApi = reactive({
  active: model,
  selectTab,
  background: toRef(props, 'background'),
})

provide(TABS_PANEL_API_KEY, api)
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
$tab-border-radius: 8px;
.tabs-panel {
  &:deep(*:first-child) {
    border-top-left-radius: $tab-border-radius;
    border-bottom-left-radius: $tab-border-radius;
  }
  &:deep(*:last-child) {
    border-top-right-radius: $tab-border-radius;
    border-bottom-right-radius: $tab-border-radius;
  }
}
</style>
