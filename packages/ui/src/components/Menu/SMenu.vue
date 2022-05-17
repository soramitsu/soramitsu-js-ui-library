<script lang="ts">
export default { name: 'SMenu' }
</script>

<script setup lang="ts">
import { MENU_API_KEY } from '@/components/Menu/api'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    collapsed?: boolean
  }>(),
  {
    modelValue: '',
    collapsed: false,
  },
)

const emit = defineEmits<(event: 'update:modelValue', value: string) => void>()
const model = useVModel(props, 'modelValue', emit, { passive: true })

const collapsed = computed(() => props.collapsed)

const api = {
  active: model,
  select,
  collapsed,
}

function select(value: string) {
  model.value = value
}

provide(MENU_API_KEY, api)
</script>

<template>
  <nav
    data-testid="menu"
    class="s-menu flex flex-col"
    :class="{
      's-menu_collapsed': collapsed,
    }"
  >
    <div class="s-menu__header">
      <slot name="header" />
    </div>

    <ul
      class="flex-grow"
      role="tree"
    >
      <slot />
    </ul>

    <slot name="footer" />
  </nav>
</template>

<style lang="scss">
@use '@/theme';

.s-menu {
  background-color: #2e2e36; // Base [night] / Background
  color: theme.token-as-var('sys.color.content-on-background-inverted');
  width: 220px;
  height: 100%;
  transition: 150ms ease-in-out width;

  &_collapsed {
    width: 64px;
  }

  &__header {
    background-color: #26262d; // Utility [night] / Surface
  }
}
</style>
