<script lang="ts">
export default { name: 'SMenuItem' }
</script>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { useMenuApi, useSubmenuApi } from '@/components/Menu/api'
import SMenuItemBody from '@/components/Menu/SMenuItemBody.vue'

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
  isInSubmenu.value = true

  submenuApi.register(ref(props.index))

  onUnmounted(() => {
    submenuApi.unregister(ref(props.index))
  })
}
</script>

<template>
  <li role="none">
    <SMenuItemBody
      data-testid="menu-item"
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
    </SMenuItemBody>
  </li>
</template>
