<script setup lang="ts">
type BtnType = 'primary' | 'secondary' | 'outline' | 'action'

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
      `s-button_type_${props.type}`,
      {
        's-button_rounded': rounded,
      },
    ]"
  >
    {{ props.type }}
    <slot />
  </div>
</template>

<style lang="scss">
.s-button {
  @apply cursor-pointer inline-block px-2 py-1 rounded select-none;

  &_type_primary {
    @apply bg-accent text-white;

    &:hover {
      @apply bg-accent-hover;
    }

    &:active {
      @apply bg-accent-pressed;
    }
  }

  &_type_primary &_disabled {
    @apply bg-accent-disabled;
  }



  &_type_secondary, &_type_action {
    @apply bg-base-background text-base-content-primary;

    &:hover {
      @apply bg-base-background-hover;
    }

    &:active {
      @apply bg-base-border-primary;
    }
  }

  &_type_secondary &_disabled, &_type_action &_disabled {
    @apply bg-base-disabled text-base-content-quaternary;
  }



  &_type_outline {
    @apply border border-solid border-base-border-primary text-base-content-primary;

    &:hover {
      @apply border-accent-hover text-accent-hover;
    }

    &:active {
      @apply border-accent-pressed text-accent-pressed;
    }
  }

  &_type_outline &_disabled {
    @apply border-base-border-primary text-base-content-quaternary;
  }



  &__rounded {
    @apply rounded-full;
  }
}
</style>
