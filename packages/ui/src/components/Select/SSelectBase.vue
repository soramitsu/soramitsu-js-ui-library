<script setup lang="ts">
import { SelectSize, type SelectOption, type SelectOptionGroup } from './types'
import { useSelectModel } from './use-model'
import { type SelectApi, SELECT_API_KEY } from './api'
import { and, not } from '@vueuse/math'
import { SPopover, SPopoverWrappedTransition } from '@/components/Popover'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    multiple?: boolean

    modelValue?: any
    options?: SelectOption[] | SelectOptionGroup[]

    size?: SelectSize

    /**
     * This value is used if `label` slot is missing
     */
    label?: string | null

    /**
     * TODO
     *
     * - Doesn't allow to unselect value in single mode
     * - Doesn't allow to unselect last the only one picked value in multiple mode
     * - Picks some value automatically (the first one) if `modelValue` is null and there are some available options
     */
    mandatory?: boolean

    /**
     * TODO
     */
    syncMenuAndInputWidths?: boolean

    /**
     * By default, the component will close its dropdown when the value is selected.
     * **Works only in single mode.**.
     *
     * Turn on this prop to disable auto-close.
     */
    noAutoClose?: boolean

    /**
     * Enables loading state.
     */
    loading?: boolean

    /**
     * Makes popper same width as trigger.
     */
    sameWidthPopper?: boolean

    /**
     * By default, the component filters options by their labels using a simple RegExp.
     * In order to implement custom search, set this flag to `true` and listen for the
     * `search` event
     *
     * @default false
     */
    searchExternal?: boolean
  }>(),
  {
    size: SelectSize.Md,
    options: () => [],
    modelValue: null,
    multiple: false,
    disabled: false,
    syncMenuAndInputWidths: false,
    noAutoClose: false,
    label: null,
    loading: false,
    sameWidthPopper: false,
    searchExternal: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
  (event: 'search', value: string): void
}>()

const model = useVModel(props, 'modelValue', emit)
const { multiple, disabled, loading, options, size, label, noAutoClose, searchExternal } = toRefs(props)

const modeling = useSelectModel({
  model,
  multiple,
  options,
  storeSelectedOptions: searchExternal,
  singleModeAutoClose: not(noAutoClose),
  onAutoClose: () => togglePopper(false),
})

const [showPopper, togglePopper] = useToggle(false)

// close popper if select is disabled
whenever(and(disabled, showPopper), () => togglePopper(false), { immediate: true })

const searchQuery = ref('')
whenever(and(not(showPopper), not(searchExternal)), () => {
  searchQuery.value = ''
})

function updateSearchQuery(query: string) {
  searchQuery.value = query

  emit('search', searchQuery.value)
}

const api: SelectApi<any> = reactive({
  ...modeling,
  multiple,
  options,
  disabled,
  loading,
  label,
  isMenuOpened: showPopper,
  menuToggle: togglePopper,
  size,
  noAutoClose,
  searchQuery,
  searchExternal,
  updateSearchQuery,
})

provide(SELECT_API_KEY, api)
</script>

<template>
  <div>
    <SPopover
      v-model:show="showPopper"
      :same-width="sameWidthPopper"
      placement="bottom-start"
      trigger="manual"
      distance="4"
      @click-outside="togglePopper(false)"
    >
      <template #trigger>
        <div>
          <slot name="control" />
        </div>
      </template>

      <template #popper>
        <SPopoverWrappedTransition
          name="s-select-dropdown-transition"
          eager
          :wrapper-attrs="{ 'class': 'z-10' }"
          :inner-wrapper-attrs="{ 'class': { 'w-full': sameWidthPopper } }"
        >
          <slot name="dropdown" />
        </SPopoverWrappedTransition>
      </template>
    </SPopover>
  </div>
</template>

<style lang="scss">
$ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
$ease-in-back: cubic-bezier(0.36, 0, 0.66, -0.56);
$dur: 0.2s;

.s-select-dropdown-transition {
  &-enter-active {
    transition: all $dur $ease-out-back;
  }
  &-leave-active {
    transition: all $dur $ease-in-back;
  }

  &-enter-from,
  &-leave-to {
    transform: scale(0.6);
    opacity: 0;
  }
}
</style>
