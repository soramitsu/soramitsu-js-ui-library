<script setup lang="ts">
interface Props {
  /**
   * Id for matching checkbox with label
   *
   */
  id: string
  /**
   * Text label for checkbox
   *
   * @default ''
   */
  label?: string
  /**
   * Attr specifies whether checkbox is set
   *
   * @default true
   */
  checked?: boolean
  /**
   * Attr specfifies whether checkbox is disabled
   *
   * @default false
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  checked: true,
  disabled: false,
})
</script>

<template>
  <div class="s-switch">
    <input class="s-switch-button" type="checkbox" :id="id" :checked="checked" :disabled="disabled" />
    <label class="s-switch-label" :for="id">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
$color-switch-btn-label: #2d2926;
$color-switch-btn-label-disabled: #a3a4a8;
$color-switch-btn-checked: #d0021b;
$color-switch-btn-checked-hover: #c6021a;
$color-switch-btn-unchecked: #dde0e1;

.s-switch {
  display: flex;
  align-items: center;

  &-button {
    position: relative;
    background-color: $color-switch-btn-unchecked;
    width: 40px;
    height: 20px;
    appearance: none;
    outline: none;
    border-radius: 20px;
    transition: 0.5s;

    &:checked {
      background-color: $color-switch-btn-checked;
    }

    &:checked:hover {
      background-color: $color-switch-btn-checked-hover;
    }

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      top: 0;
      left: 0;
      background-color: #fff;
      transition: 0.5s;
      transform: scale(0.8);
    }

    &:checked::before {
      left: 20px;
    }

    &:hover {
      background-color: $color-switch-btn-checked-hover;
      cursor: pointer;
    }

    &:disabled {
      background-color: $color-switch-btn-unchecked;
    }

    &:disabled + .s-switch-label {
      color: $color-switch-btn-label-disabled;
    }

    &:disabled:hover {
      background-color: $color-switch-btn-unchecked;
      cursor: pointer;
    }
  }

  &-label {
    // font-family: 'Sora';
    color: $color-switch-btn-label;
    font-size: 20px;
    margin-left: 8px;
    text-align: center;
  }
}
</style>
