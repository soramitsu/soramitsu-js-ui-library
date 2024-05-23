<script setup lang="ts">
import { SSpinner } from '../Spinner'
import { usePropTypeFilter } from '@/composables/prop-type-filter'
import {
  BUTTON_ICON_POSITION_VALUES,
  BUTTON_SIZE_VALUES,
  BUTTON_TYPE_VALUES,
  SPINNER_SIZE,
  SPINNER_WIDTH,
  FONT_SIZE,
} from './consts'
import { ButtonType, ButtonSize, ButtonIconPosition, HTMLButtonType } from './types'

const props = withDefaults(
  defineProps<{
    type?: ButtonType
    size?: ButtonSize
    nativeType?: HTMLButtonType
    icon?: string
    iconPosition?: ButtonIconPosition
    rounded?: boolean
    disabled?: boolean
    loading?: boolean
    uppercase?: boolean
    alternative?: boolean
    primary?: boolean
  }>(),
  {
    type: 'secondary',
    size: 'md',
    nativeType: 'button',
    icon: '',
    iconPosition: 'left',
    rounded: false,
    disabled: false,
    loading: false,
    uppercase: false,
    alternative: false,
    primary: false,
  },
)

const filterProp = usePropTypeFilter(props)

const definitelyType = filterProp('type', BUTTON_TYPE_VALUES, 'primary')
const definitelySize = filterProp('size', BUTTON_SIZE_VALUES, 'md')
const definitelyIconPosition = filterProp('iconPosition', BUTTON_ICON_POSITION_VALUES, 'left')
const isAction = computed(() => definitelyType.value === 'action')
const font = computed(() => {
  if (definitelySize.value === 'xs' && props.uppercase) {
    return 'sora-tpg-ch3'
  }

  return FONT_SIZE[definitelySize.value]
})
</script>

<template>
  <button
    :type="nativeType"
    :class="[
      's-button',
      `s-button_type_${definitelyType}`,
      `s-button_size_${definitelySize}`,
      `s-button_icon-position_${definitelyIconPosition}`,
      font,
      {
        's-button_disabled': loading || disabled,
        's-button_rounded': isAction && rounded,
        's-button_loading': loading,
        [`s-button_type_${definitelyType}_alternative`]: alternative,
        [`s-button_type_${definitelyType}_primary`]: primary,
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
      class="s-button__text"
      data-testid="text"
    >
      <slot v-if="!isAction" />
    </span>
  </button>
</template>

<style lang="scss">
@use '@/theme';
@use '@/theme_neumorphism';

@mixin button-type($name, $default, $hover, $active, $disabled) {
  &_type_#{$name} {
    @apply #{$default};

    &:hover {
      @apply #{$hover};
    }

    &:active {
      @apply #{$active};
    }
  }

  &_type_#{$name}#{&}_disabled {
    @apply #{$disabled};
  }
}

@mixin button-size($name, $height, $padding, $icon-size, $border-radius: 4px) {
  &_size_#{$name} {
    height: $height;
    border-radius: $border-radius;
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
  border: 
  theme_neumorphism.token-as-var('sys.border.button.width') 
  theme_neumorphism.token-as-var('sys.border.button.style') 
  theme_neumorphism.token-as-var('sys.color.button.primary.border-color');
  transition: theme_neumorphism.token-as-var('sys.transition.button');
  fill: currentColor;
  $component: &;

  &_disabled {
    @apply cursor-default;
    color: theme_neumorphism.token-as-var('sys.disabled.button.text-color');
    background: theme_neumorphism.token-as-var('sys.disabled.button.background-color');
    border-color: theme_neumorphism.token-as-var('sys.disabled.button.border-color');
    box-shadow: theme_neumorphism.token-as-var('sys.disabled.button.box-shadow');
    border-width: theme_neumorphism.token-as-var('sys.border.button.width');
  }

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

  &_type_action &__icon,
  &_size_mini#{&}_type_action &__icon,
  & &__icon:empty {
    @apply mx-0;
  }

  &_type_primary {
    background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color');
    color: theme.token-as-var('sys.color.content-on-background-inverted');
    box-shadow:  theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow');

    &:hover {
      background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color-hover');
      border-color: theme_neumorphism.token-as-var('sys.color.button.primary.border-color-hover');
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow-hover');
      color: theme_neumorphism.token-as-var('sys.color.button.primary.text-color-hover');
    }

    &:active {
      background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color-pressed');
      border-color: theme_neumorphism.token-as-var('sys.color.button.primary.border-color-pressed');
      box-shadow:  theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow-pressed');
      color: theme_neumorphism.token-as-var('sys.color.button.primary.text-color-pressed');
    }

    &_alternative { 
      background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color-alternative');
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow-alternative');
      border-width: theme_neumorphism.token-as-var('sys.border.button.primary.alternative.width');
      &:hover,&:active {
        background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color-alternative-active');
        box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow-alternative');
      }
    }
  }

  &_type_secondary {
    background-color: theme_neumorphism.token-as-var('sys.color.button.secondary.background-color');
    color: theme_neumorphism.token-as-var('sys.color.button.secondary.text-color');
    border: 
    theme_neumorphism.token-as-var('sys.border.button.secondary.width') 
    theme_neumorphism.token-as-var('sys.border.button.secondary.style') 
    theme_neumorphism.token-as-var('sys.color.button.secondary.border-color');
    box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.secondary.box-shadow');

    &:active {
      background-color: theme_neumorphism.token-as-var('sys.color.button.secondary.background-color-active');
      color: theme_neumorphism.token-as-var('sys.color.button.secondary.text-color-active');
      border-color: theme_neumorphism.token-as-var('sys.color.button.secondary.border-color-active');
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.secondary.box-shadow-active');
    }
    &:hover {
      background-color: theme_neumorphism.token-as-var('sys.color.button.secondary.background-color-hover');
    }
  }

  &_type_tertiary {
    background-color: theme_neumorphism.token-as-var('sys.color.button.tertiary.background-color');
    color: theme_neumorphism.token-as-var('sys.color.button.tertiary.text-color');
    border: 
    theme_neumorphism.token-as-var('sys.border.button.tertiary.width') 
    theme_neumorphism.token-as-var('sys.border.button.tertiary.style') 
    theme_neumorphism.token-as-var('sys.color.button.tertiary.border-color');
    box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.tertiary.box-shadow');

    &:hover, &:focus, &.focusing, &:active, &.s-pressed {
      background:  theme_neumorphism.token-as-var('sys.color.button.tertiary.background-color-active');
      border-color: theme_neumorphism.token-as-var('sys.color.button.tertiary.border-color-active');
      color: theme_neumorphism.token-as-var('sys.color.button.tertiary.text-color-active');
    }
    &:hover, &:focus, &.focusing {
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.tertiary.box-shadow-active');
    }
    &:active, &.s-pressed {
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.tertiary.box-shadow-pressed');
    }
  }

   &_type_action {
    background: theme_neumorphism.token-as-var('sys.color.button.action.background-color'); 
    border-color: theme_neumorphism.token-as-var('sys.color.button.action.border-color'); 
    border-style: theme_neumorphism.token-as-var('sys.border.button.action.style');
    border-width: theme_neumorphism.token-as-var('sys.border.button.action.width');
    box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.action.box-shadow');
    color: theme_neumorphism.token-as-var('sys.color.button.action.text-color');

    &:hover, &:focus, &.focusing {
      background: theme_neumorphism.token-as-var('sys.color.button.action.background-color-hover'); 
      border-color: theme_neumorphism.token-as-var('sys.color.button.action.border-color-hover');
      color: theme_neumorphism.token-as-var('sys.color.button.action.text-color-hover');
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.action.box-shadow-hover');
    }
    &:active, &.s-pressed {
      background: theme_neumorphism.token-as-var('sys.color.button.action.background-color-pressed');
      border-color: theme_neumorphism.token-as-var('sys.color.button.action.border-color-pressed'); 
      box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.action.box-shadow-pressed');
    }
    &:active {
      color: theme_neumorphism.token-as-var('sys.color.button.action.text-color-active');
    }

    &_alternative {
      color: theme_neumorphism.token-as-var('sys.color.button.action.text-color-alternative');

      &, &:hover, &:focus, &.focusing, &:active, &.s-pressed {
        background-color: theme_neumorphism.token-as-var('sys.color.button.action.background-color-alternative'); 
        border-color: theme_neumorphism.token-as-var('sys.color.button.action.border-color-alternative'); 
        box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.action.box-shadow-alternative'); 
      }
      &:hover, &:focus, &.focusing, &:active, &.s-pressed {
        color: theme_neumorphism.token-as-var('sys.color.button.action.text-color-alternative-active');
      }
    }
    &_primary {
      background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color');
      color: theme.token-as-var('sys.color.content-on-background-inverted');
      box-shadow:  theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow');
      border: 
      theme_neumorphism.token-as-var('sys.border.button.width') 
      theme_neumorphism.token-as-var('sys.border.button.style') 
      theme_neumorphism.token-as-var('sys.color.button.primary.border-color');

      &:hover {
        background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color-hover');
        border-color: theme_neumorphism.token-as-var('sys.color.button.primary.border-color-hover');
        box-shadow: theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow-hover');
        color: theme_neumorphism.token-as-var('sys.color.button.primary.text-color-hover');
      }

      &:active {
        background-color: theme_neumorphism.token-as-var('sys.color.button.primary.background-color-pressed');
        border-color: theme_neumorphism.token-as-var('sys.color.button.primary.border-color-pressed');
        box-shadow:  theme_neumorphism.token-as-var('sys.shadow.button.primary.box-shadow-pressed');
        color: theme_neumorphism.token-as-var('sys.color.button.primary.text-color-pressed');
      }
    }
    &.primary:not(:disabled) {
      color: theme_neumorphism.token-as-var('sys.color.button.action.text-color-primary')
    }
  }

  
  @include button-size(xs, $height: 24px, $padding: px-8px, $icon-size: 12px, $border-radius: 2px);

  @include button-size(sm, $height: 32px, $padding: px-12px, $icon-size: 16px);

  @include button-size(md, $height: 40px, $padding: px-16px, $icon-size: 16px);

  @include button-size(lg, $height: 56px, $padding: px-24px, $icon-size: 24px);

  &_rounded {
    @apply rounded-full;
  }

  &_loading {
    #{$component}__icon,
    #{$component}__text {
      @apply invisible;
    }
  }
}
</style>
