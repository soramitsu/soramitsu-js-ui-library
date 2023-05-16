<script setup lang="ts">
import { type OptionDataGetters, type OptionsGroup, SelectButtonStyle, SelectOptionStyle, SelectSize } from './types'
import { Listbox, ListboxOptions } from '@headlessui/vue'
import { useFloating, offset, flip } from '@floating-ui/vue'
import SSelectOption from './SSelectOption.vue'
import SSelectButton from './SSelectButton.vue'
import SSelectOptgroup from './SSelectOptgroup.vue'
import { SELECT_API_KEY, type SelectApi } from './api'
import { useSelectModel } from './use-model'
import { useParsedOptions, normaliseGetter } from './utils'
import type { PrimitiveKey } from '@/types'
import type { ComponentPublicInstance } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    modelValue?: unknown
    disabled?: boolean
    multiple?: boolean

    options: object[]
    optionGetKey: string | ((option: object) => PrimitiveKey)
    optionGetLabel: string | ((option: object) => string)
    optionGetValue?: string | ((option: object) => unknown)
    optionGetDisabled?: string | ((option: object) => boolean)
    optionGetAsGroup?: (option: object) => null | OptionsGroup<object>

    label: string

    size?: SelectSize
    optionStyle?: SelectOptionStyle
    buttonStyle?: SelectButtonStyle
  }>(),
  {
    label: undefined,
    disabled: false,
    multiple: false,
    modelValue: undefined,

    optionGetValue: () => (x: unknown) => x,
    optionGetDisabled: undefined,
    optionGetAsGroup: undefined,

    size: SelectSize.Md,
    optionStyle: SelectOptionStyle.Check,
    buttonStyle: SelectButtonStyle.Default,
  },
)

const emit = defineEmits(['update:model-value'])

const modelAsValues = useVModel(props, 'modelValue', emit)

const optionGetters: OptionDataGetters<object, unknown> = reactive({
  value: computed(() => normaliseGetter(props.optionGetValue)),
  key: computed(() => normaliseGetter(props.optionGetKey)),
  label: computed(() => normaliseGetter(props.optionGetLabel)),
  disabled: computed(() => (props.optionGetDisabled ? normaliseGetter(props.optionGetDisabled) : null)),
  asGroup: computed(() => props.optionGetAsGroup ?? null),
})

const optionsParsed = useParsedOptions({
  options: () => props.options,
  optionGetAsGroup: () => optionGetters.asGroup,
})

const { modelAsOptions } = useSelectModel<object, unknown>({
  multiple: toRef(() => props.multiple),
  optionsParsed,
  optionGetters,
  modelAsValues,
})

const isEmptySelection = computedEager(() => {
  const value = modelAsOptions.value
  return !value || (Array.isArray(value) && !value.length)
})

// TODO check if reactivity works

const listboxCmp = (a: object | undefined, b: object | undefined): boolean => {
  return (!a && !b && a === b) || (!!a && !!b && optionGetters.key(a) === optionGetters.key(b))
}
// const listboxCmp = computed(() => {
//   const get = getKey.value
//   return (a: object, b: object): boolean => {
//     return get(a) === get(b)
//   }
// })

const buttonRef = templateRef<null | ComponentPublicInstance>('button')
const buttonElementRef = toRef(() => buttonRef.value?.$el ?? null)

const floatingRef = templateRef<null | ComponentPublicInstance>('floating')
const floatingElementRef = toRef(() => floatingRef.value?.$el ?? null)

const { floatingStyles } = useFloating(buttonElementRef, floatingElementRef, {
  placement: 'bottom-start',
  middleware: [offset(8), flip()],
})

const api: SelectApi<object, unknown> = readonly(
  reactive({
    disabled: toRef(() => props.disabled),
    multiple: toRef(() => props.multiple),
    size: toRef(() => props.size),
    optionStyle: toRef(() => props.optionStyle),
    buttonStyle: toRef(() => props.buttonStyle),
    optionGetters,
    modelAsOptions,
    isEmptySelection,
  }),
)

provide(SELECT_API_KEY, api)
</script>

<template>
  <Listbox
    v-model="modelAsOptions"
    :by="listboxCmp"
    :multiple="multiple"
    :disabled="disabled"
  >
    <SSelectButton
      ref="button"
      :label="label"
    />

    <ListboxOptions
      ref="floating"
      class="s-select-dropdown"
      :style="floatingStyles"
    >
      <template
        v-for="item in optionsParsed"
        :key="item.kind === 'group' ? item.key : optionGetters.key(item.raw)"
      >
        <SSelectOption
          v-if="item.kind === 'item'"
          :option="item.raw"
        />

        <SSelectOptgroup
          v-else
          :group="item"
        >
          <SSelectOption
            v-for="child in item.options"
            :key="optionGetters.key(child)"
            :option="child"
          />
        </SSelectOptgroup>
      </template>
    </ListboxOptions>
  </Listbox>
</template>

<style lang="scss">
@use '@/theme';

.s-select-dropdown {
  // FIXME find a way to configure width
  width: 320px;

  @apply rounded;
  background: theme.token-as-var('sys.color.util.surface');
  box-shadow: theme.token-as-var('sys.shadow.dropdown');
  border: 1px solid theme.token-as-var('sys.color.border-primary');

  &:focus {
    outline: none;
  }

  // FIXME
  //&__header {
  //  color: theme.token-as-var('sys.color.content-tertiary');
  //  border-bottom: 1px solid theme.token-as-var('sys.color.border-primary');
  //}
  //
  //&__action {
  //  color: theme.token-as-var('sys.color.status.info');
  //}

  //&__search {
  //  border-bottom: 1px solid theme.token-as-var('sys.color.border-primary');
  //  background: theme.token-as-var('sys.color.background');
  //
  //  &:focus-within {
  //    background: transparent;
  //  }
  //}
  //
  //&__search-icon {
  //  fill: theme.token-as-var('sys.color.content-tertiary');
  //}
  //
  //&__search-input {
  //  color: theme.token-as-var('sys.color.content-primary');
  //
  //  &::placeholder {
  //    color: theme.token-as-var('sys.color.content-tertiary');
  //  }
  //}

  @mixin select-dropdown-size($name, $option-height, $px, $loading-height, $spinner-size) {
    &_size_#{$name} &__header,
    &_size_#{$name} &__search {
      height: $option-height;
      padding-right: $px;
      padding-left: $px;
    }

    &_size_#{$name} &__loading {
      height: $loading-height;

      // spinner styles
      font-size: $spinner-size;
      color: theme.token-as-var('sys.color.content-tertiary');
    }
  }

  @include select-dropdown-size('xl', $option-height: 56px, $px: 16px, $loading-height: 170px, $spinner-size: 40px);
  @include select-dropdown-size('lg', $option-height: 40px, $px: 16px, $loading-height: 150px, $spinner-size: 40px);
  @include select-dropdown-size('md', $option-height: 32px, $px: 10px, $loading-height: 120px, $spinner-size: 24px);
  @include select-dropdown-size('sm', $option-height: 24px, $px: 8px, $loading-height: 100px, $spinner-size: 24px);
}
</style>
