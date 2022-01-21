<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { SSpinner } from '@/lib'

const BUTTON_TYPE_VALUES = ['primary', 'secondary', 'outline', 'action'] as const
const BUTTON_SIZE_VALUES = ['mini', 'small', 'medium', 'big'] as const
const BUTTON_ICON_POSITION_VALUES = ['left', 'right'] as const

type ButtonType = typeof BUTTON_TYPE_VALUES[number]
type ButtonSize = typeof BUTTON_SIZE_VALUES[number]
type ButtonIconPosition = typeof BUTTON_ICON_POSITION_VALUES[number]

const SPINNER_SIZE: Record<ButtonSize, string> = {
  mini: '12',
  small: '18',
  medium: '24',
  big: '24',
}

const SPINNER_WIDTH: Record<ButtonSize, string> = {
  mini: '3',
  small: '4',
  medium: '4',
  big: '4',
}

function usePropTypeFilter<T>(value: T, validValues: readonly T[], defaultValue: T): ComputedRef<T> {
  return computed(() => {
    if (validValues.includes(value)) {
      return value
    }

    return defaultValue
  })
}

const props = withDefaults(
  defineProps<{
    type?: ButtonType,
    size?: ButtonSize,
    nativeType?: string,
    icon?: string,
    iconPosition?: ButtonIconPosition,
    rounded?: boolean,
    disabled?: boolean,
    loading?: boolean,
    uppercase?: boolean,
  }>(),
  {
    type: 'secondary',
    size: 'medium',
    nativeType: 'button',
    icon: '',
    iconPosition: 'left',
    rounded: false,
    disabled: false,
    loading: false,
    uppercase: false,
  },
)

const definitelyType = usePropTypeFilter(props.type, BUTTON_TYPE_VALUES, 'primary')
const definitelySize = usePropTypeFilter(props.size, BUTTON_SIZE_VALUES, 'medium')
const definitelyIconPosition = usePropTypeFilter(props.iconPosition, BUTTON_ICON_POSITION_VALUES, 'left')
const isAction = computed(() => definitelyType.value === 'action')
</script>

<template>
  <button
    :type="nativeType"
    :class="[
      's-button',
      `s-button_type_${definitelyType}`,
      `s-button_size_${definitelySize}`,
      `s-button_icon-position_${definitelyIconPosition}`,
      {
        's-button_disabled': loading || disabled,
        'rounded-full': isAction && rounded,
        's-ty-ch3': definitelySize === 'mini' && uppercase,
      },
    ]"
    :disabled="loading || disabled"
  >
    <SSpinner
      v-if="loading"
      class="flex-grow absolute"
      data-testid="spinner"
      :size="SPINNER_SIZE[definitelySize]"
      :width="SPINNER_WIDTH[definitelySize]"
    />

    <span
      class="s-button__icon"
      :class="{ 'invisible': loading }"
      data-testid="icon"
    >
      <i
        v-if="icon"
        :class="icon"
      />
      <slot
        v-else
        name="icon"
      />
    </span>
    <span
      :class="{ 'invisible': loading }"
      data-testid="text"
    >
      <slot v-if="!isAction" />
    </span>
  </button>
</template>

<style lang="scss">
@mixin button-type($name, $default, $hover, $active, $disabled) {
  &_type_#{$name} {
    @apply #{$default};
    fill: currentColor;

    &:hover {
      @apply #{$hover};
    }

    &:active {
      @apply #{$active};
    }
  }

  &_type_#{$name}#{&}_disabled {
    @apply cursor-default;
    @apply #{$disabled};
  }
}

@mixin button-size($name, $height, $padding, $font, $icon-size, $border-radius: 4px) {
  &_size_#{$name} {
    height: $height;
    border-radius: $border-radius;
    @apply #{$font};
  }

  &_size_#{$name} &__icon {
    font-size: $icon-size;
  }

  &_size_#{$name}:not(&_type_action) {
    @apply #{$padding};
  }

  &_size_#{$name}#{&}_type_action {
    width: $height;
  }
}

.s-button {
  @apply cursor-pointer inline-flex rounded select-none items-center justify-center;

  &_icon-position_left {
    @apply flex-row;
  }

  &_icon-position_left &__icon {
    @apply mr-8px;
  }

  &_size_mini#{&}_icon-position_left &__icon {
    @apply mr-6px;
  }

  &_icon-position_right {
    @apply flex-row-reverse;
  }

  &_icon-position_right &__icon {
    @apply ml-8px;
  }

  &_size_mini#{&}_icon-position_right &__icon {
    @apply ml-6px;
  }

  &_type_action &__icon, &_size_mini#{&}_type_action &__icon, & &__icon:empty {
    @apply mx-0;
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

  @include button-size(mini,
    $height: 24px,
    $padding: px-8px,
    $font: s-ty-p4,
    $icon-size: 12px,
    $border-radius: 2px
  );

  @include button-size(small,
    $height: 32px,
    $padding: px-12px,
    $font: s-ty-h7,
    $icon-size: 16px
  );

  @include button-size(medium,
    $height: 40px,
    $padding: px-16px,
    $font: s-ty-h6,
    $icon-size: 16px
  );

  @include button-size(big,
    $height: 56px,
    $padding: px-24px,
    $font: s-ty-h5,
    $icon-size: 24px
  );
}
</style>
