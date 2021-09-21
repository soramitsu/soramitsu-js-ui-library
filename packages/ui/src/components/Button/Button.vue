<script setup lang="ts">
type BtnType = 'primary' | 'secondary'

const props = withDefaults(
  defineProps<{
    rounded?: boolean
    type?: BtnType
  }>(),
  {
    type: 'primary',
  },
)
</script>

<template>
  <div
    role="button"
    tabindex="0"
    :class="[
      's-button',
      `s-button--type-${type}`,
      {
        's-button--rounded': rounded,
      },
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.s-button {
  @apply cursor-pointer inline-block px-2 py-1 rounded select-none;

  &--type-primary {
    @apply text-white bg-accent;
    &:hover {
      @apply bg-accent-hover;
    }
    &:active {
      @apply bg-accent-pressed;
    }
    &:focus {
      @apply bg-accent-focused;
    }
  }

  &--type-secondary {
    @apply bg-gray-300 text-black;
  }

  &--rounded {
    @apply rounded-full;
  }
}
</style>
