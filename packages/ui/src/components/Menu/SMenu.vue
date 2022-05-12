<script lang="ts">
export default { name: 'SMenu' }
</script>

<script setup lang="ts">
import { MENU_API_KEY } from '@/components/Menu/api'

const props = withDefaults(
  defineProps<{
    defaultActive?: string
    collapsed?: boolean
  }>(),
  {
    defaultActive: '',
    collapsed: false,
  },
)

const active = ref(props.defaultActive)
const collapsed = computed(() => props.collapsed)

const api = {
  active,
  select,
  collapsed,
}

function select(value: string) {
  active.value = value
}

provide(MENU_API_KEY, api)
</script>

<template>
  <ul
    class="s-menu"
    :class="{
      's-menu_collapsed': collapsed,
    }"
  >
    <slot />
  </ul>
</template>

<style lang="scss">
.s-menu {
  background-color: #2e2e36; // Base [night] / Background
  width: 220px;
  height: 100%;
  transition: 150ms ease-in-out width;

  &_collapsed {
    width: 64px;
  }
}
</style>
