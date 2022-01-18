<script setup lang="ts">
type BtnType = 'primary' | 'secondary' | 'outline' | 'action'

const props = withDefaults(
  defineProps<{
    type?: BtnType,
    rounded?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'primary',
    rounded: false,
    disabled: false,
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
        's-button_disabled': disabled,
        'rounded-full': rounded,
      },
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.s-button {
  @apply cursor-pointer inline-block px-2 py-1 rounded select-none;

  @mixin button-type($name, $default, $hover, $active, $disabled) {
    &_type_#{$name} {
      @apply #{$default};

      &:hover {
        @apply #{$hover}
      }

      &:active {
        @apply #{$active}
      }
    }

    &_type_primary &_disabled {
      @apply #{$disabled}
    }
  }

  @include button-type(primary,
    $default: bg-accent text-white,
    $hover: bg-accent-hover,
    $active: bg-accent-pressed,
    $disabled: bg-accent-disabled,
  );

  @include button-type(secondary,
    $default: bg-base-background text-base-content-primary,
    $hover: bg-base-background-hover,
    $active: bg-base-border-primary,
    $disabled:bg-base-disabled text-base-content-quaternary,
  );

  @include button-type(action,
    $default: bg-base-background text-base-content-primary,
    $hover: bg-base-background-hover,
    $active: bg-base-border-primary,
    $disabled: bg-base-disabled text-base-content-quaternary,
  );

  @include button-type(outline,
    $default: border border-solid border-base-border-primary text-base-content-primary,
    $hover: border-accent-hover text-accent-hover,
    $active: border-accent-pressed text-accent-pressed,
    $disabled: border-base-border-primary text-base-content-quaternary,
  );
}
</style>
