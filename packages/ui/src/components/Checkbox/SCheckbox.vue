<script lang="ts">
  export default {
    name: 'SCheckbox',
    inheritAttrs: false,
    customOptions: {}
  }
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxSize } from './consts';

type CheckboxValue = string | number;
type CheckboxModelValue = boolean | CheckboxValue[];

interface Checkbox {
  value?: CheckboxValue;
  trueValue?: CheckboxValue | boolean;
  falseValue?: CheckboxValue | boolean;
  modelValue?: CheckboxModelValue;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  border?: boolean;
  size?: CheckboxSize;
};

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>();

const props = withDefaults(
  defineProps<Checkbox>(),
  {
    trueValue: true,
    falseValue: false,
    size: CheckboxSize.MEDIUM
  },
);

const model = computed({
  get(): CheckboxModelValue {
    return props.modelValue
  },
  set(value: CheckboxModelValue) {
    emit("update:modelValue", value);
  }
});

const checked = computed((): boolean => {
  if (typeof props.modelValue === 'boolean') {
    return props.modelValue;
  } else if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  } else {
    return props.modelValue === props.trueValue;
  }
});
</script>

<template>
  <label
    :class="[
      's-checkbox',
      `s-checkbox--size-${size}`,
      {
        's-checkbox--bordered': border,
        's-checkbox--checked': checked,
        's-checkbox--disabled': disabled,
        's-checkbox--indeterminate': indeterminate,
      }
    ]"
  >
    <div class="s-checkbox__content">
      <span class="s-checkbox__input">
        <input
          :id="id"
          :name="name"
          :true-value="trueValue"
          :false-value="falseValue"
          :value="value"
          :checked="checked"
          :disabled="disabled"
          :indeterminate="indeterminate"
          v-model="model"
          type="checkbox"
          class="s-checkbox__original"
        />
        <span class="s-checkbox__inner" />
      </span>
      <span class="s-checkbox__label" v-if="$slots.default || label">
        <slot>{{ label }}</slot>
      </span>
    </div>
    <div class="s-checkbox__description" v-if="$slots.description">
      <slot name="description" />
    </div>
  </label>
</template>

<style lang="scss">
@mixin size($size, $padding, $labelOffset, $descriptionOffset) {
  $base: calc(var(--s-size-#{$size}) / 2);

  &--size-#{$size} {
    &.s-checkbox--bordered {
      padding: $padding;
    }

    .s-checkbox__inner {
      width: $base;
      height: $base;
    }

    .s-checkbox__input + .s-checkbox__label {
      margin-left: $labelOffset;
    }

    .s-checkbox__description {
      margin-top: $descriptionOffset;
    }
  }
}

@mixin checkmark-size($size, $top, $left, $width, $height) {
  &--size-#{$size} {
    .s-checkbox__inner {
      &::after {
        top: $top;
        left: $left;
        width: $width;
        height: $height;
      }
    }
  }
}

@mixin label-size($size, $fontSize, $lineHeight) {
  &--size-#{$size} {
    .s-checkbox__label {
      font-size: $fontSize;
      line-height: $lineHeight;
      letter-spacing: -0.02em;
    }
  }
}

.s-checkbox {
  cursor: pointer;
  display: inline-flex;
  flex-flow: column nowrap;

  @include size('mini', 7px 7px, 6px, 4px);
  @include size('small', 7px 9px, 6px, 6px);
  @include size('medium', 9px 9px, 8px, 8px);
  @include checkmark-size('mini', 1px, 3px, 2px, 5px);
  @include checkmark-size('small', 0px, 4px, 4px, 8px);
  @include checkmark-size('medium', 1px, 6px, 5px, 10px);
  @include label-size('mini', var(--s-font-size-2xs), 16px);
  @include label-size('small', var(--s-font-size-xs), 18px);
  @include label-size('medium', var(--s-font-size-sm), 20px);

  &--disabled {
    cursor: not-allowed;
    color: var(--s-color-base-on-disabled);
  }

  &:hover,
  &:focus,
  &--checked,
  &--indeterminate {
    &:not(.s-checkbox--disabled) {
      .s-checkbox__inner {
        border-color: var(--s-color-theme-accent-hover);
      }
      &.s-checkbox--bordered {
        border-color: var(--s-color-theme-accent-hover);
      }
    }
  }

  &--checked,
  &--indeterminate {
    &:not(.s-checkbox--disabled) {
      .s-checkbox__inner {
        background-color: var(--s-color-theme-accent-hover);
        border-color: var(--s-color-theme-accent-hover);
      }
    }

    &.s-checkbox--disabled {
      .s-checkbox__inner {
        background-color: var(--s-color-base-disabled);
        border-color: var(--s-color-base-disabled);

        &::after {
          border-color: var(--s-color-base-on-disabled);
        }
      }
    }
  }

  &--checked {
    .s-checkbox__inner {
      &::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }

  &--bordered {
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    border-color: var(--s-color-base-border-primary);
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__input {
    display: flex;
  }

  &__original {
    display: none;
  }

  &__inner {
    position: relative;
    display: inline-block;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--s-color-base-border-primary);

    &::after {
      content: "";
      box-sizing: content-box;
      border-color: white;
      border-style: solid;
      border-left: 0;
      border-top: 0;
      border-width: 2px;
      position: absolute;
      transform: rotate(45deg) scaleY(0);
      transition: transform .15s ease-in .05s;
      transform-origin: center;
    }
  }
}
</style>
