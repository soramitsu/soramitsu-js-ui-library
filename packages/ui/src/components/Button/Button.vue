<script setup lang="ts">
import { computed, ComputedRef } from 'vue'

const BUTTON_TYPE_VALUES = ['primary', 'secondary', 'outline', 'action'] as const
const BUTTON_SIZE_VALUES = ['mini', 'small', 'medium', 'big'] as const
const BUTTON_BORDER_RADIUS_VALUES = ['mini', 'small', 'medium', 'big'] as const

type ButtonType = typeof BUTTON_TYPE_VALUES[number]
type ButtonSize = typeof BUTTON_SIZE_VALUES[number]
type ButtonBorderRadius = typeof BUTTON_BORDER_RADIUS_VALUES[number]

function usePropsTypeFilter<T>(value: T, validValues: readonly T[], defaultValue?: T): ComputedRef<T> {
  return computed(() => {
    if (validValues.includes(value)) {
      return value
    }

    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new Error('Wrong type')
  })
}

const props = withDefaults(
  defineProps<{
    type?: ButtonType,
    size?: ButtonSize,
    borderRadius?: ButtonBorderRadius,
    rounded?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'primary',
    size: 'medium',
    borderRadius: 'medium',
    rounded: false,
    disabled: false,
  },
)

const definitelyType = usePropsTypeFilter(props.type, BUTTON_TYPE_VALUES, 'primary')
const definitelySize = usePropsTypeFilter(props.size, BUTTON_SIZE_VALUES, 'medium')
const definitelyBorderRadius = usePropsTypeFilter(props.borderRadius, BUTTON_BORDER_RADIUS_VALUES, 'medium')
</script>

<template>
  <div
    role="button"
    tabindex="0"
    :class="[
      's-button',
      `s-button_type_${definitelyType}`,
      `s-button_size_${definitelySize}`,
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

    &_type_#{$name}#{&}_disabled {
      @apply #{$disabled}
    }
  }

  @include button-type(primary,
    $default: bg-accent text-white,
    $hover: bg-accent-hover,
    $active: bg-accent-pressed,
    $disabled: bg-secondary-hover,
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

  &_size {
    &_mini {
      height: 24px;
    }

    &_small {
      height: 32px;
    }

    &_medium {
      height: 40px;
    }

    &_big {
      height: 56px;
    }
  }
}
</style>
