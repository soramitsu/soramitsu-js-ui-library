<script lang="ts">
export default { name: 'SNavigationMenuItem' }
</script>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useMenuApi, useSubmenuApi } from '@/components/NavigationMenu/api'
import SNavigationMenuItemBody from '@/components/NavigationMenu/SNavigationMenutemBody.vue'

const props = withDefaults(
  defineProps<{
    index: string
  }>(),
  {},
)

const emit = defineEmits<(event: 'click', value: HTMLElement) => void>()

const menuApi = useMenuApi()

const isSelected = computed(() => menuApi.active.value === props.index)
const isMenuCollapsed = computed(() => menuApi.collapsed.value)

function handleClick(event: HTMLElement) {
  if (menuApi) {
    menuApi.select(props.index)
  }

  emit('click', event)
}

const isInSubmenu = ref(false)
const submenuApi = useSubmenuApi()

if (submenuApi) {
  const index = computed(() => props.index)
  isInSubmenu.value = true
  submenuApi.register(index)

  onUnmounted(() => {
    submenuApi.unregister(index)
  })
}
</script>

<template>
  <li role="none">
    <SNavigationMenuItemBody
      data-testid="navigation-menu-item"
      role="treeitem"
      :aria-selected="isSelected"
      :active="isSelected"
      :submenu-item="isInSubmenu"
      :minified="isMenuCollapsed"
      @click="handleClick"
    >
      <template #icon="iconProps">
        <slot
          name="icon"
          v-bind="iconProps"
        />
      </template>

      <slot />
    </SNavigationMenuItemBody>
  </li>
</template>
