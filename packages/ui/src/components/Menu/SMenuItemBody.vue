<script lang="ts">
export default { name: 'SMenuItemBody' }
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: string
    submenuItem?: boolean
    active?: boolean
    minified?: boolean
  }>(),
  {
    tag: 'div',
    submenuItem: false,
    active: false,
    minified: false,
  },
)

const emit = defineEmits<(event: 'click', value: HTMLElement) => void>()

function handleClick(event: HTMLElement) {
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    class="s-menu-item-body flex items-center cursor-pointer pl-24px pr-16px"
    :class="{
      's-menu-item-body_submenu-item': submenuItem,
      's-menu-item-body_active': active,
      'py-8px': submenuItem,
      'py-14px': !submenuItem,
    }"
    @click="handleClick"
  >
    <div class="s-menu-item-body__prepend flex-shrink-0 flex items-center justify-end h-16px w-16px mr-8px">
      <slot
        v-if="!submenuItem"
        name="icon"
        :class="'s-menu-item-body__icon'"
      />
    </div>

    <div
      class="s-menu-item-body__content truncate"
      :class="{
        'invisible': minified,
      }"
    >
      <slot />
    </div>

    <div
      v-show="!minified"
      class="ml-auto pl-8px"
    >
      <slot
        name="append"
        :class="'s-menu-item-body__append'"
      />
    </div>
  </component>
</template>

<style lang="scss">
@use '@/theme';

.s-menu-item-body {
  $root: &;
  background-color: #2e2e36; // Base [night] / Background
  min-height: 54px;

  &_submenu-item {
    min-height: 50px;
    background-color: #26262d; // Utility [night] / Surface
  }

  &_active,
  &:hover {
    background-color: #26262d; // Utility [night] / Surface
    box-shadow: inset 5px 0 theme.token-as-var('sys.color.primary');
  }

  &_submenu-item#{$root}_active,
  &_submenu-item:hover {
    box-shadow: none;

    #{$root}__prepend::before {
      content: '';
      background-color: theme.token-as-var('sys.color.primary');
      width: 5px;
      height: 5px;
    }
  }

  &__icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &__append {
    fill: currentColor;
  }
}
</style>
