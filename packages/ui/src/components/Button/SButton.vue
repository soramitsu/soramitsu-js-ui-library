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
import type { ButtonType, ButtonSize, ButtonIconPosition, HTMLButtonType } from './types'

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
const pressed = ref(false)

const handleClick = (event: Event) => {
  pressed.value = true
  setTimeout(() => {
    pressed.value = false
  }, 500)
}


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
        's-pressed': pressed,
      },
    ]"
    :disabled="loading || disabled"
    @click="handleClick"
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
@use 'sass:meta';
@use '@/theme_neumorphism' as theme_neumorphism;
@use '@/theme' as theme;
@import '../../themes.scss';



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

@mixin disabled (
  $theme,
  $border-width: null, 
  $background-color: null, 
  $box-shadow: null
) {
  $border-width: if($border-width == null, theme.token-as-var('sys.border.button.width'), $border-width);
  $background-color: if($background-color == null, theme.token-as-var('sys.disabled.button.background-color'), $background-color);
  $box-shadow: if($box-shadow == null, theme.token-as-var('ref.color.shadow.shadow-element'), $box-shadow);

  &_disabled, &_disabled:hover {
    color: theme.token-as-var('ref.color.common.color-base-content-tertiary');
    background: $background-color;
    border-color: theme.token-as-var('sys.disabled.button.border-color');
    box-shadow: $box-shadow;
    border-width: $border-width;
  }
}

// Main button
@mixin apply-theme-button($theme) {
  border: 
  theme.token-as-var('sys.border.button.width') 
  theme.token-as-var('ref.border.style') 
  theme.token-as-var('sys.color.button.primary.border-color');
  transition: theme.token-as-var('sys.transition.button');
}

// Primary
@mixin apply-theme-primary($theme) {
  background-color: theme-token($theme,'ref.color.common.color-theme-accent');
  color: theme-token($theme,'ref.color.common.color-base-on-accent');
  box-shadow: theme-token($theme,'sys.shadow.button.primary.box-shadow');

  &:hover,&:focus, &.focusing {
    background-color: theme-token($theme,'sys.color.button.primary.background-color-hover');
    border-color: theme-token($theme,'ref.color.common.color-utility-surface');
    box-shadow:  theme-token($theme,'sys.shadow.button.primary.box-shadow-hover');
    color: theme-token($theme,'ref.color.common.color-base-on-accent');
    &.is-circle {
      border-color: theme-token($theme,'sys.color.button.primary.background-color-hover');
    }
  }

  &:active, &.s-pressed {
    background-color:  theme-token($theme,'sys.color.button.primary.background-color-pressed');
    border-color:  theme-token($theme,'ref.color.common.color-utility-surface');
    box-shadow:   theme-token($theme,'sys.shadow.button.primary.box-shadow-pressed');
    color:  theme-token($theme,'ref.color.common.color-base-on-accent');
  }
   @include disabled($theme: theme);
}
// Primary-alternative
@mixin apply-theme-primary-alternative($theme) {
  background-color: theme-token($theme,'sys.color.button.primary.background-color-alternative');
  box-shadow: theme-token($theme,'sys.shadow.button.primary.box-shadow-alternative');
  border-width: theme-token($theme,'ref.border.width');

  &:hover, &:focus, &.focusing, &:active, &.s-pressed {
    background-color: theme-token($theme,'sys.color.button.primary.background-color-alternative-active');
    box-shadow:  theme-token($theme,'sys.shadow.button.primary.box-shadow-alternative');
  }
  @include disabled($theme: theme,$border-width: theme_neumorphism.token-as-var('ref.border.width'));
}

// Secondary
@mixin apply-theme-secondary($theme) {
  background-color: theme-token($theme,'ref.color.common.color-base-content-tertiary');
  color: theme-token($theme,'sys.color.button.secondary.text-color');
  border: 
  theme-token($theme,'ref.border.width') 
  theme-token($theme,'ref.border.style') 
  theme-token($theme,'sys.color.button.secondary.border-color');
  box-shadow: theme-token($theme,'ref.color.shadow.shadow-element-pressed');

  &:hover, &:focus, &.focusing, &:active, &.s-pressed{
    background: theme-token($theme,'ref.color.common.color-base-content-secondary');
    border-color: theme-token($theme,'sys.color.button.secondary.border-color-active');
    color: theme-token($theme,'sys.color.button.secondary.text-color-active');
  }
  &:active,&.s-pressed {
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element');
  }
  @include disabled($theme: theme, $border-width: theme_neumorphism.token-as-var('ref.border.width'));
}

// Terrtiary
@mixin apply-theme-tertiary($theme) {
  background-color: theme-token($theme,'ref.color.common.color-utility-body');
  color: theme-token($theme,'sys.color.button.tertiary.text-color');
  border: 
  theme-token($theme,'ref.border.width') 
  theme-token($theme,'ref.border.style') 
  theme-token($theme,'ref.color.common.border-color');
  box-shadow: theme-token($theme,'ref.color.shadow.shadow-element-pressed');

  &:hover, &:focus, &.focusing, &:active, &.s-pressed {
    background: theme-token($theme,'ref.color.common.color-utility-body');
    border-color: theme-token($theme,'ref.color.common.border-color');
    color: theme-token($theme,'sys.color.button.tertiary.text-color-active');
  }
  &:hover, &:focus, &.focusing {
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element');
  }
  &:active, &.s-pressed {
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element');
  }
  @include disabled($theme: theme, $border-width: theme_neumorphism.token-as-var('ref.border.width'));
}

//Action
@mixin apply-theme-action($theme) {
  background: theme-token($theme,'sys.color.button.action.background-color'); 
  border-color: theme-token($theme,'ref.color.common.border-color'); 
  border-style: theme-token($theme,'ref.border.style');
  border-width: theme-token($theme,'ref.border.width');
  box-shadow: theme-token($theme,'ref.color.shadow.shadow-element-pressed');
  color: theme-token($theme,'sys.color.button.action.text-color');

  &:hover, &:focus, &.focusing {
    background: theme-token($theme,'sys.color.button.action.background-color-hover'); 
    border-color: theme-token($theme,'ref.color.common.border-color');
    color: theme-token($theme,'sys.color.button.action.text-color-hover');
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element');
  }
  &:active, &.s-pressed {
    background: theme-token($theme,'sys.color.button.action.background-color-pressed');
    border-color: theme-token($theme,'ref.color.common.border-color'); 
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element-pressed');
  }
  &:active {
    color: theme-token($theme,'sys.color.button.action.text-color-active');
  }
  @include disabled(
    $theme: theme,
    $border-width: theme_neumorphism.token-as-var('ref.border.width'), 
    $background-color: theme_neumorphism.token-as-var('sys.color.button.action.background-color'), 
    $box-shadow: theme_neumorphism.token-as-var('ref.color.shadow.shadow-element-pressed'),
  );
  &.primary:not(:disabled) {
    color: theme-token($theme,'ref.color.common.color-base-on-accent')
  }
}
// Action-alternative
@mixin apply-theme-action-alternative($theme) {
  color: theme-token($theme,'ref.color.common.color-base-content-tertiary');
  &, &:hover, &:focus, &.focusing, &:active, &.s-pressed {
    background-color: theme-token($theme,'ref.color.common.border-color'); 
    border-color: theme-token($theme,'ref.color.common.border-color'); 
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element-pressed'); 
  }
  &:hover, &:focus, &.focusing, &:active, &.s-pressed {
    color: theme-token($theme,'ref.color.common.color-base-content-secondary');
  }
  @include disabled( 
    $theme: theme,
    $border-width: theme_neumorphism.token-as-var('ref.border.width'), 
    $background-color: theme_neumorphism.token-as-var('ref.color.common.border-color'), 
    $box-shadow: theme_neumorphism.token-as-var('ref.color.shadow.shadow-element-pressed'),
  );
}
// Action-primary
@mixin apply-theme-action-primary($theme) {
  background-color: theme-token($theme,'ref.color.common.color-theme-accent');
  color: theme-token($theme,'ref.color.common.color-base-on-accent');
  box-shadow:  theme-token($theme,'sys.shadow.button.primary.box-shadow');
  border: 
  theme-token($theme,'sys.border.button.width') 
  theme-token($theme,'ref.border.style') 
  theme-token($theme,'sys.color.button.primary.border-color');

  &:hover {
    background-color: theme-token($theme,'sys.color.button.primary.background-color-hover');
    border-color: theme-token($theme,'ref.color.common.color-utility-surface');
    box-shadow: theme-token($theme,'sys.shadow.button.primary.box-shadow-hover');
    color: theme-token($theme,'ref.color.common.color-base-on-accent');
  }

  &:active {
    background-color: theme-token($theme,'sys.color.button.primary.background-color-pressed');
    border-color: theme-token($theme,'ref.color.common.color-utility-surface');
    box-shadow: theme-token($theme,'sys.shadow.button.primary.box-shadow-pressed');
    color: theme-token($theme,'ref.color.common.color-base-on-accent');
  }
}


@mixin apply-theme($theme-name, $theme-variable) {
  .s-button {
    @include apply-theme-button($theme: $theme-variable);
  }
  .s-button_type_primary {
    @include apply-theme-primary($theme: $theme-variable);
  }
  .s-button_type_primary_alternative {
    @include apply-theme-primary-alternative($theme: $theme-variable);
  }
  .s-button_type_secondary {
    @include apply-theme-secondary($theme: $theme-variable);
  }

  .s-button_type_action {
    @include apply-theme-action($theme: $theme-variable);
  }


  @if $theme-name != '' {
    .s-button_type_tertiary {
      @include apply-theme-tertiary($theme: $theme-variable);
    }
      .s-button_type_action_alternative {
      @include apply-theme-action-alternative($theme: $theme-variable);
    }
    .s-button_type_action_primary {
      @include apply-theme-action-primary($theme: $theme-variable);
    }
  }
}

@each $theme-name, $theme-variable in $themes {
  [theme="#{$theme-name}"] {
    @include apply-theme($theme-name, $theme-variable);
  }
}


.s-button {
  background-color: theme.token-as-var('sys.color.button.action.background-color');
  color: theme.token-as-var('sys.color.button.secondary.text-color');
  @apply cursor-pointer inline-flex rounded select-none items-center justify-center;
  fill: currentColor;
  $component: &;

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
