<script lang="ts">
export default { name: 'SNavigationMenuItem' }
</script>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useMenuApi, useSubmenuApi } from '@/components/NavigationMenu/api'
import SNavigationMenuItemBody from '@/components/NavigationMenu/SNavigationMenuItemBody.vue'

const props = withDefaults(
  defineProps<{
    /**
     * Item identifier
     */
    value: string
  }>(),
  {},
)

const menuApi = useMenuApi()

const isSelected = computed(() => menuApi.active.value === props.value)
const isMenuCollapsed = computed(() => menuApi.collapsed.value)

function handleClick() {
  if (menuApi) {
    menuApi.select(props.value)
  }
}

const isInSubmenu = ref(false)
const submenuApi = useSubmenuApi()

if (submenuApi) {
  const value = computed(() => props.value)
  isInSubmenu.value = true
  submenuApi.register(value)

  onUnmounted(() => {
    submenuApi.unregister(value)
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
