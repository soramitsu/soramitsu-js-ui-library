<script setup lang="ts">
import { useSelectApi } from './api'
import { SelectOptionGroup, SelectOptionType, SelectSize } from './types'
import SSelectOption from './SSelectOption.vue'
import { ComputedRef } from 'vue'
import { isSelectOptions } from '@/components/Select/utils'
import SSpinner from '@/components/Spinner/SSpinner.vue'

defineProps<{
  itemType: SelectOptionType
}>()

const api = useSelectApi()

const fontClass = computed(() => (api.size === SelectSize.Xl ? 'sora-tpg-p3' : 'sora-tpg-p4'))

const optionGroups: ComputedRef<SelectOptionGroup[]> = computed(() => {
  const options = api.options

  if (isSelectOptions(options)) {
    return [{ items: options }]
  }

  return options
})

function isActionButtonShown(selectAllBtn: boolean) {
  return api.multiple && selectAllBtn
}

const HEADER_FONT = {
  [SelectSize.Xl]: 'sora-tpg-ch2',
  [SelectSize.Lg]: 'sora-tpg-ch3',
  [SelectSize.Md]: 'sora-tpg-ch3',
  [SelectSize.Sm]: 'sora-tpg-ch3',
} as const

const ACTION_FONT = {
  [SelectSize.Xl]: 'sora-tpg-p3',
  [SelectSize.Lg]: 'sora-tpg-p4',
  [SelectSize.Md]: 'sora-tpg-p4',
  [SelectSize.Sm]: 'sora-tpg-p4',
} as const
</script>

<template>
  <div
    class="s-select-dropdown"
    :class="`s-select-dropdown_size_${api.size}`"
  >
    <div
      v-if="api.loading"
      class="s-select-dropdown__loading flex items-center justify-center"
    >
      <SSpinner />
    </div>

    <template v-else>
      <template
        v-for="(optionGroup, i) in optionGroups"
        :key="i"
      >
        <div
          v-if="isActionButtonShown(!!optionGroup.selectAllBtn) || optionGroup.header"
          class="s-select-dropdown__header flex items-center justify-between"
        >
          <div
            v-if="optionGroup.header"
            :class="HEADER_FONT[api.size]"
          >
            {{ optionGroup.header }}
          </div>
          <button
            v-if="isActionButtonShown(!!optionGroup.selectAllBtn)"
            class="s-select-dropdown__action cursor-pointer"
            :class="ACTION_FONT[api.size]"
            @click="api.toggleGroupSelection(optionGroup)"
          >
            {{ api.isGroupSelected(optionGroup) ? 'Deselect all' : 'Select all' }}
          </button>
        </div>
        <SSelectOption
          v-for="(opt, j) in optionGroup.items"
          :key="j"
          :class="fontClass"
          :type="itemType"
          :multiple="api.multiple"
          :selected="api.isValueSelected(opt.value)"
          @toggle="api.toggleSelection(opt.value)"
        >
          {{ opt.label }}
        </SSelectOption>
      </template>
    </template>
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-select-dropdown {
  @apply rounded overflow-hidden;
  background: theme.token-as-var('sys.color.util.surface');
  box-shadow: theme.token-as-var('sys.shadow.dropdown');

  &__header {
    color: theme.token-as-var('sys.color.content-tertiary');
    border-bottom: 1px solid theme.token-as-var('sys.color.border-primary');
  }

  &__action {
    color: theme.token-as-var('sys.color.status.info');
  }

  @mixin select-dropdown-size($name, $header-height, $px, $loading-height, $spinner-size) {
    &_size_#{$name} &__header {
      height: $header-height;
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

  @include select-dropdown-size('xl', $header-height: 56px, $px: 16px, $loading-height: 170px, $spinner-size: 40px);
  @include select-dropdown-size('lg', $header-height: 40px, $px: 16px, $loading-height: 150px, $spinner-size: 40px);
  @include select-dropdown-size('md', $header-height: 32px, $px: 10px, $loading-height: 120px, $spinner-size: 24px);
  @include select-dropdown-size('sm', $header-height: 24px, $px: 8px, $loading-height: 100px, $spinner-size: 24px);
}
</style>
