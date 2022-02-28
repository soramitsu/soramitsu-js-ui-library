<script lang="ts">
export default {
  name: 'SCheckboxSolo',
}
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { uniqueElementId } from '@/util'
import { CheckboxSize, CheckboxType, CHECKBOX_SIZE_VALUES, CHECKBOX_TYPE_VALUES } from './types'
import { validateChecked } from './util'
import SRadioBody from '../Radio/SRadioBody'
import SCheckboxAtom from './SCheckboxAtom'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    validate: validateChecked,
  },
  type: {
    type: String as PropType<CheckboxType>,
    default: 'default',
    validate: (x: any) => CHECKBOX_TYPE_VALUES.includes(x),
  },
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'md',
    validate: (x: any) => CHECKBOX_SIZE_VALUES.includes(x),
  },
  tri: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const model = useVModel(props, 'modelValue', emit, { passive: true })
function toggleModel() {
  model.value = !model.value
}

const uniqueLabelId = uniqueElementId()
const uniqueDescriptionId = uniqueElementId()
const hover = ref(false)
</script>

<template>
  <SRadioBody
    role="checkbox"
    :aria-checked="model"
    :aria-disabled="disabled"
    :size="size"
    :type="type"
    :label-id="uniqueLabelId"
    :description-id="uniqueDescriptionId"
    tabindex="0"
    class="s-checkbox-solo"
    @click="toggleModel"
    @keypress.space="toggleModel"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <template #atom>
      <SCheckboxAtom
        :checked="model && tri ? 'mixed' : model"
        :size="size"
        :disabled="disabled"
        :hover="hover"
      />
    </template>

    <template #label>
      <slot />
    </template>

    <template #description>
      <slot name="description" />
    </template>
  </SRadioBody>
</template>

<style lang="scss">
@use '@/theme';

.s-checkbox-solo.s-radio-body {
  &[aria-disabled='true'] {
    pointer-events: none;

    label,
    .s-radio-body__description {
      color: theme.token-as-var('sys.color.on-disabled');
    }
  }

  &[data-type^='bordered'] {
    &:hover,
    &[aria-checked='true']:not([aria-disabled='true']) {
      border-color: theme.token-as-var('sys.color.primary');
    }
  }
}
</style>
