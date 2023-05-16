<script setup lang="ts">
import { SelectOptionStyle, SelectSize } from './types'
import IconCheckMark from '~icons/mdi/check'
import { useSelectApi } from './api'
import { SCheckboxAtom } from '../Checkbox'
import { SRadioAtom } from '../Radio'
import { CHECK_ICON_SIZE, RADIO_CHECKBOX_SIZE } from './const'
import { ListboxOption } from '@headlessui/vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  option: unknown
  // value: unknown
  // disabled?: boolean
}>()

const api = useSelectApi()

const emit = defineEmits<(event: 'toggle') => void>()

const disabled = toRef(() => api.optionGetters.disabled?.(props.option) ?? false)

const typography = () => {
  return api.size === SelectSize.Xl ? 'sora-tpg-p3' : 'sora-tpg-p4'
}
</script>

<template>
  <ListboxOption
    v-slot="{ selected, active }"
    :value="api.optionGetters.value(option)"
    :disabled="disabled"
    as="template"
  >
    <li
      :class="[
        's-select-option',
        `s-select-option_size_${api.size}`,
        {
          's-select-option_selected': selected,
          's-select-option_active': active,
          's-select-option_disabled': disabled,
        },
        typography(),
      ]"
      data-testid="select-option"
    >
      <template v-if="api.optionStyle === SelectOptionStyle.RadioAndCheckbox">
        <SCheckboxAtom
          v-if="api.multiple === true"
          class="flex-shrink-0"
          data-testid="select-option-checkbox"
          :checked="selected"
          :size="RADIO_CHECKBOX_SIZE[api.size]"
          :disabled="disabled"
        />
        <SRadioAtom
          v-else
          class="flex-shrink-0"
          data-testid="select-option-radio"
          :checked="selected"
          :size="RADIO_CHECKBOX_SIZE[api.size]"
          :disabled="disabled"
        />
      </template>

      <div class="s-select-option__content truncate">
        {{ api.optionGetters.label(option) }}
      </div>

      <IconCheckMark
        v-if="api.optionStyle === SelectOptionStyle.Check && selected"
        class="flex-shrink-0"
        data-testid="select-option-checkmark"
        :width="CHECK_ICON_SIZE[api.size]"
        :height="CHECK_ICON_SIZE[api.size]"
      />
    </li>
  </ListboxOption>
</template>

<style lang="scss">
@use './sizes-mixin.scss';
@use '@/theme';

.s-select-option {
  background: theme.token-as-var('sys.color.util.surface');
  @apply flex items-center px-[10px] py-1 select-none cursor-pointer space-x-8px;

  $root: &;

  &:hover,
  &:active,
  &_selected {
    &:not(#{$root}_disabled) {
      background: theme.token-as-var('sys.color.background');
    }
  }

  &__content {
    @apply flex-1;
  }

  $root: &;

  &_size {
    @include sizes-mixin.s-select-sizes;
  }

  &_active {
    outline: 2px solid theme.token-as-var('sys.color.primary-outline');
  }

  &_disabled {
    cursor: not-allowed;
    color: theme.token-as-var('sys.color.content-quaternary');
  }

  &:last-child {
    @apply rounded-b;
  }

  &:first-child {
    @apply rounded-t;
  }
}
</style>
