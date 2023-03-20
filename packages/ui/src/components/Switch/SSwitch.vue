<script setup lang="ts">
import { uniqueElementId } from '@/util'

type Props = {
  /**
   * Switch state
   */
  modelValue?: boolean
  /**
   * Text label for switch. Required for a11y. If you don't want it to be rendered, use {@link labelHidden}
   *
   * @default ''
   */
  label: string
  /**
   * Whether to render label or not
   *
   * @default false
   */
  labelHidden?: boolean
  /**
   * Whether the input is disabled or not
   *
   * @default false
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  labelHidden: false,
})

const inputId = uniqueElementId()

const emit = defineEmits<(event: 'update:modelValue', value: boolean) => void>()
const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="s-switch">
    <input
      :id="inputId"
      v-model="model"
      type="checkbox"
      :disabled="disabled"
      class="s-switch__button"
    >
    <!-- note: `sr-only` class visually hides the element while keeping it accessible for Screen Reader -->
    <label
      :for="inputId"
      :class="['s-switch__label sora-tpg-p3', { 'sr-only': labelHidden }]"
    >{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
@use '@/theme';

$border-primary: theme.token-as-var('sys.color.border-primary');
$content-primary: theme.token-as-var('sys.color.content-primary');
$content-quaternary: theme.token-as-var('sys.color.content-quaternary');
$primary: theme.token-as-var('sys.color.primary');
$primary-hover: theme.token-as-var('sys.color.primary-hover');
$util-surface: theme.token-as-var('sys.color.util.surface');

.s-switch {
  display: flex;
  align-items: center;
  &__button {
    position: relative;
    background-color: $border-primary;
    width: 40px;
    height: 20px;
    appearance: none;
    outline: none;
    border-radius: 20px;
    transition: 0.5s;
    &:checked {
      background-color: $primary;
    }
    &:checked:hover {
      background-color: $primary-hover;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      top: 0;
      left: 0;
      background-color: $util-surface;
      transition: 0.5s;
      transform: scale(0.8);
    }
    &:checked::before {
      left: 20px;
    }
    &:hover {
      background-color: $primary-hover;
      cursor: pointer;
    }
    &:disabled {
      background-color: $border-primary;
    }
    &:disabled + .s-switch-label {
      color: $content-quaternary;
    }
    &:disabled:hover {
      background-color: $border-primary;
      cursor: pointer;
    }
  }
  &__label {
    color: $content-primary;
    margin-left: 8px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
