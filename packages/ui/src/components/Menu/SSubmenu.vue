<script lang="ts">
export default { name: 'SSubmenu' }
</script>

<script setup lang="ts">
import { Ref } from 'vue'
import SMenuItemBody from '@/components/Menu/SMenuItemBody.vue'
import { SCollapseTransition } from '@/components/Transitions'
import { SUBMENU_API_KEY, useMenuApi } from '@/components/Menu/api'
import { IconChevronBottom16 } from '@/components/icons'
import { and, not } from '@vueuse/core'

const includedItems = shallowReactive(new Set<Ref<string>>([]))

const api = {
  register,
  unregister,
}
provide(SUBMENU_API_KEY, api)

function register(index: Ref<string>) {
  includedItems.add(index)
}

function unregister(index: Ref<string>) {
  includedItems.delete(index)
}

const [opened, toggle] = useToggle(false)

function handleTriggerClick() {
  if (!isMenuCollapsed.value) {
    toggle()
  }
}

const menuApi = useMenuApi()

let isMenuCollapsed = computed(() => menuApi.collapsed.value)
let hasActiveItem = computed(() => [...includedItems].map((x) => x.value).includes(menuApi.active.value))

whenever(and(not(isMenuCollapsed), hasActiveItem), () => toggle(true), { immediate: true })
whenever(isMenuCollapsed, () => toggle(false), { immediate: true })
</script>

<template>
  <li
    data-testid="submenu"
    role="treeitem"
    :aria-expanded="opened"
    :aria-selected="opened"
    class="s-submenu"
    :class="{ 's-submenu_opened': opened }"
  >
    <SMenuItemBody
      data-testid="submenu-trigger"
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
          aria-hidden="true"
          width="10"
          heigh="10"
        />
      </template>
    </SMenuItemBody>

    <SCollapseTransition>
      <div v-show="opened">
        <ul
          class="s-submenu__items"
          data-testid="submenu-items"
        >
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
