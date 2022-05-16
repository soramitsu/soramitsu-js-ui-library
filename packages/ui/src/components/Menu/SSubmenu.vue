<script lang="ts">
export default { name: 'SSubmenu' }
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
  if (!isMenuCollapsed.value) {
    toggle()
  }
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
  if (isMenuCollapsed.value) {
    toggle(false)
  }
})
</script>

<template>
  <li
    class="s-submenu"
    :class="{ 's-submenu_opened': opened }"
  >
    <SMenuItemBody
      :active="opened || hasActiveItem"
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
      <div v-show="opened">
        <ul class="s-submenu__items">
          <slot />
        </ul>
      </div>
    </SCollapseTransition>
  </li>
</template>

<style lang="scss">
.s-submenu {
  &__chevron {
    transition: 150ms ease-in-out transform;
  }

  &_opened &__chevron {
    transform: rotateZ(-180deg);
  }

  &_opened &__items .s-menu-item-body__content,
  &_opened &__items .s-menu-item-body__prepend {
    animation: 150ms ease-in-out slide;
  }

  @keyframes slide {
    0% {
      transform: translateX(-16px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
