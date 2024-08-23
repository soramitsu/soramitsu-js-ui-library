<template>
  <div 
    class="s-float-text-field"
    :class="{ 's-float-text-field_focused': isFocused }"
  >
    <slot name="top"></slot>

    <div
      class="s-float-text-field__input-wrapper"
      tabindex="0" 
      @click="handleInputWrapperClick"
      @keydown.enter="handleInputWrapperClick"
      @keydown.space="handleInputWrapperClick"
    >
      <!-- Floating label -->
      <label v-if="label" :for="id" :class="labelClass">{{ label }}</label>

      <div class="s-float-text-field__input-line">
        <slot name="left"></slot>

        <input
          :id="id"
          ref="inputRef"
          v-bind="inputAttrs()"
          v-model="inputValue"
          @input="onInputHandler"
          @focus="handleFocus"
          @blur="onBlur"
          @dblclick="onDblClick"
        >

        <slot name="right"></slot>
      </div>

      <slot name="append"></slot>
    </div>

    <slot name="bottom"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

interface Props {
  label?: string;
  id?: string;
  delimiters?: { thousand: string; decimal: string };
  decimals?: number;
  max?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  delimiters: () => ({ thousand: ',', decimal: '.' }),
  decimals: 2,
  id: 'float-input-id',
  max: undefined
});

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
let charsCountBeforeSelection = 0;

const attrs = useAttrs();
const inputAttrs = () => {
  const { style, class: clazz, ...rest } = attrs;
  return rest;
};

const labelClass = computed(() => ({
  's-float-text-field__label_focused': isFocused.value,
}));

function saveSelectionPosition(value: string) {
  if (!inputRef.value) return;
  const pos = inputRef.value.selectionStart as number;
  const chars = value.slice(0, pos).replace(new RegExp('\\' + props.delimiters?.thousand, 'g'), '');
  charsCountBeforeSelection = chars.length;
}

function updateSelectionPosition() {
  if (!inputRef.value) return;
  const value = inputRef.value.value;
  const { thousand } = props.delimiters!;
  let selection = 0;

  for (let handledChars = 0; handledChars < charsCountBeforeSelection; selection++) {
    if (value.charAt(selection) !== thousand) {
      handledChars++;
    }
  }

  inputRef.value.selectionStart = inputRef.value.selectionEnd = selection;
}

async function onInputHandler(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  saveSelectionPosition(value);

  const newValue = [
    (v: string) => normalizeDelimiters(v),
    (v: string) => formatNumberField(v, props.decimals),
    (v: string) => isNumberLikeValue(v) ? v : '0',
    (v: string) => checkValueForExtremum(v),
  ].reduce((buffer, rule) => rule(buffer), value);

  inputValue.value = newValue;

  await nextTick();
  updateSelectionPosition();
}

function onBlur(event: FocusEvent) {
  isFocused.value = false;
}

function onDblClick(event: MouseEvent) {
  const target = event.target as HTMLInputElement;
  target.select();
}

function normalizeDelimiters(value: string) {
  const formatted = value.replace(new RegExp('\\' + props.delimiters?.thousand, 'g'), '');
  if (props.delimiters?.decimal !== '.') {
    return formatted.replace(props.delimiters.decimal, '.');
  }
  return formatted;
}

function formatNumberField(value: string, decimals?: number) {
  if (!['string', 'number'].includes(typeof value)) return value;

  let formatted = String(value).replace(/[^\d.]/g, '');

  if (/^0+/.test(formatted) && formatted.indexOf('.') !== -1) {
    formatted = formatted.replace(/^0+(\d)/, '$1');
  }

  if (formatted.indexOf('.') === 0) {
    formatted = '0' + formatted;
    charsCountBeforeSelection++;
  }

  if ((formatted.match(/\./g) || []).length > 1) {
    const decimalDelimiterIndex = formatted.indexOf('.');
    formatted = formatted.substring(0, decimalDelimiterIndex + 1) + formatted.substring(decimalDelimiterIndex + 1).replace('.', '');
  }

  const lengthLimit = valueMaxLength(formatted, decimals);
  if (lengthLimit && formatted.length > lengthLimit) {
    formatted = formatted.slice(0, lengthLimit);
  }

  return formatted;
}

function checkValueForExtremum(value: string) {
  if (!value) return value;
  if (props.max && Number(value) > Number(props.max)) return String(props.max);
  return value;
}

function valueMaxLength(value: string, decimals?: number) {
  const fpIndex = value.indexOf('.');
  return fpIndex !== -1 ? fpIndex + 1 + (decimals ?? 2) : undefined;
}

function isNumberLikeValue(value: string) {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

function handleFocus() {
  isFocused.value = true;
}

function handleInputWrapperClick() {
  inputRef.value?.focus();
}
</script>


<style lang="scss">
@use 'sass:meta';
@use '@/theme_neumorphism' as theme_neumorphism;
@use '@/theme' as theme;
@import '../../themes.scss';


$height: 56px;
$input-padding: 15px;
$label-top-primary: 16px;
$label-top-secondary: 6px;
$message-icon-alignment-fix: -1px;

@mixin apply-theme-text-field($theme) {
  &__input-wrapper {
    background-color: theme-token($theme,'sys.color.textfield.background-color');
    box-shadow: theme-token($theme,'ref.color.shadow.shadow-element');
    &:hover:not(:focus-within) {
      background-color: theme-token($theme,'sys.color.textfield.background-color-hover');
    }
    &:focus-within {
      border-color: theme-token($theme,'sys.color.textfield.border-color');
      background-color: theme-token($theme,'sys.color.textfield.background-color');
      outline: 1px solid theme-token($theme,'sys.color.textfield.outline-color');
    }
    label {
      color: theme-token($theme,'sys.color.textfield.label-color');
    }
  }
  &__counter {
    color: theme-token($theme,'sys.color.textfield.counter-color');
  }
  &__append svg {
    color: theme-token($theme,'sys.color.content-secondary');
    fill: theme-token($theme,'sys.color.content-secondary');
  }

}

@mixin apply-theme($theme-name, $theme-variable) {
  .s-float-text-field {
    @include apply-theme-text-field($theme: $theme-variable);
  }
}

@each $theme-name, $theme-variable in $themes {
  [theme="#{$theme-name}"] {
    @include apply-theme($theme-name, $theme-variable);
  }
}

.s-float-text-field {
  $root: &;

  &_disabled &__input-wrapper {
    @apply pointer-events-none opacity-75;
  }

  &_disabled:hover {
    cursor: not-allowed;
  }
  &:not(&_empty),
  &_filled-state,
  &:focus-within {
    label {
      transform: translateY(#{$label-top-primary});
    }
  }

  &__input-wrapper {
    @apply rounded border border-transparent;
    @apply relative flex;
    @apply transition-all;

    min-height: $height;

    &:focus-within {
      @apply bg-transparent;
    }

    label {

      @apply pointer-events-none;
      @apply absolute top-0 left-4;
      @apply transition-all;

      // primary state by default
      transform: translateY(#{$label-top-primary});
    }
  }

  &__input-line {
    @apply flex flex-wrap flex-grow min-w-0;
    padding: $input-padding;

    input {
      @apply flex-1 w-full min-w-1/4;

      background: transparent;
      &:focus {
        outline: none;
      }
    }
  }

  &__append {
    @apply flex items-center space-x-4 pr-4;
  }

  @each $status in 'success', 'warning', 'error' {
    $col: theme.token-as-var('sys.color.status.#{$status}');
    $bg: theme.token-as-var('sys.color.status.#{$status}-background');
    $bg-hover: theme.token-as-var('sys.color.status.#{$status}-background-hover');

    &[data-status='#{$status}'] {
      label {
        color: $col;
      }

      #{$root}__input-wrapper {
        background: $bg;
        border: {
          color: $col;
        }

        &:hover:not(:focus-within) {
          background: $bg-hover;
        }

        &:focus-within {
          background: transparent;
        }
      }

      #{$root}__message-icon {
        color: $col;
      }
    }
  }

  &__message {
    @apply pt-2;

    svg#{&}-icon {
      fill: currentColor;
      @apply inline-block mr-1 relative;
      top: $message-icon-alignment-fix;
    }

    &-transition {
      &-enter-active,
      &-leave-active {
        @apply transition-all;
      }

      &-enter-from,
      &-leave-to {
        transform: translateY(-8px);
        opacity: 0;
      }
    }

    &-requirement {
      &_matched {
        color: theme.token-as-var('sys.color.status.success');
      }
    }
  }
}
</style>