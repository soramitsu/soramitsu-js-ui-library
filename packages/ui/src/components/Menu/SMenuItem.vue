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

let isSelected = ref(false)
let isMenuCollapsed = ref(false)
const menuApi = useMenuApi()

if (menuApi) {
  isSelected = computed(() => menuApi.active.value === props.index)
  isMenuCollapsed = computed(() => menuApi.collapsed.value)
}

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

  submenuApi.register(props.index)

  onUnmounted(() => {
    submenuApi.unregister(props.index)
  })
}
</script>

<template>
  <SMenuItemBody
    tag="li"
    data-testid="menu-item"
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
</template>
