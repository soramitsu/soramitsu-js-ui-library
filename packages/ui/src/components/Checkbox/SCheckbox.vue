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
type CheckboxLabel = string | number;

type CheckboxModelValue = boolean | CheckboxValue[];

interface Checkbox {
  value?: CheckboxValue;
  trueValue?: CheckboxValue | boolean;
  falseValue?: CheckboxValue | boolean;
  modelValue?: CheckboxModelValue;
  id?: string;
  name?: string;
  label?: CheckboxLabel;
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
      }
    ]"
  >
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
  </label>
</template>

<style lang="scss" scoped>
.s-checkbox {
  &--size {
    &-medium {
      .s-checkbox__inner {
        width: var(--s-size-mini) / 2;
        height: var(--s-size-mini) / 2;
      }
    }
  }
}
</style>
