<script lang="ts">
export default { name: 'SMenuItem' }
</script>

<script setup lang="ts">
import SMenuItemBody from '@/components/Menu/SMenuItemBody.vue'
import { SCollapseTransition } from '@/components/Transitions'
import { SUBMENU_API_KEY, useMenuApi } from '@/components/Menu/api'
import { IconChevronBottom16 } from '@/components/icons'

const includedItems = shallowReactive(new Set<string>([]))

const api = {
  register,
  unregister,
}
provide(SUBMENU_API_KEY, api)

function register(index: string) {
  includedItems.add(index)
}

function unregister(index: string) {
  includedItems.delete(index)
}

const [opened, toggle] = useToggle(false)

function handleTriggerClick() {
  toggle()
}

let isMenuCollapsed = ref(false)
let hasActiveItem = ref(false)
const menuApi = useMenuApi()

if (menuApi) {
  isMenuCollapsed = computed(() => menuApi.collapsed.value)
  hasActiveItem = computed(() => includedItems.has(menuApi.active.value))
}

watch(hasActiveItem, () => {
  if (!isMenuCollapsed.value && hasActiveItem.value) {
    toggle(true)
  }
})

watch(isMenuCollapsed, () => {
  if (!isMenuCollapsed.value) {
    toggle(false)
  }
})
</script>

<template>
  <li
    v-show="!isMenuCollapsed"
    class="s-submenu"
    :class="{ 's-submenu_opened': opened }"
  >
    <SMenuItemBody
      :active="opened"
      :minified="isMenuCollapsed"
      @click="handleTriggerClick"
    >
      <template #icon="iconProps">
        <slot
          name="icon"
          v-bind="iconProps"
        />
      </template>

      <slot name="title" />

      <template #append="appendProps">
        <IconChevronBottom16
          v-bind="appendProps"
          class="s-submenu__chevron"
          width="10"
          heigh="10"
        />
      </template>
    </SMenuItemBody>

    <SCollapseTransition>
      <ul v-show="opened">
        <slot />
      </ul>
    </SCollapseTransition>
  </li>
</template>

<style lang="scss">
@use '@/theme';

.s-submenu {
  &__chevron {
    transition: 150ms ease-in-out transform;
  }

  &_opened &__chevron {
    transform: rotateZ(-180deg);
  }
}
</style>
