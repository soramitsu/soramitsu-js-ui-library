<script setup lang="ts">
import { DesignSystem, DesignSystemProviderAPI, DESIGN_SYSTEM_KEY } from '@/state/design-system'
import { computed, readonly, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: DesignSystem
  }>(),
  { value: DesignSystem.Default },
)

const api: DesignSystemProviderAPI = readonly({
  current: computed(() => props.value),
})

provide(DESIGN_SYSTEM_KEY, api)
</script>

<template>
  <slot />
</template>
