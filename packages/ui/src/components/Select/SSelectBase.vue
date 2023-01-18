<script setup lang="ts">
import { SelectSize, SelectOption, SelectOptionGroup } from './types'
import { useSelectModel } from './use-model'
import { SelectApi, SELECT_API_KEY } from './api'
import { and, not } from '@vueuse/core'
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
     * By default the component will close its dropdown when the value is selected.
     * **Works only in single mode.**.
     *
     * Turn on this prop to disable auto-close.
     */
    noAutoClose?: boolean

    /**
     * Makes popper same width as trigger.
     */
    sameWidthPopper?: boolean
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
  },
)

const emit = defineEmits<(event: 'update:modelValue', value: any) => void>()

const model = useVModel(props, 'modelValue', emit)
const { multiple, disabled, options, size, label, noAutoClose } = toRefs(props)

const modeling = useSelectModel({
  model,
  multiple,
  options,
  singleModeAutoClose: not(noAutoClose),
  onAutoClose: () => togglePopper(false),
})

const [showPopper, togglePopper] = useToggle(false)

// close popper if select is disabled
whenever(and(disabled, showPopper), () => togglePopper(false), { immediate: true })

const api: SelectApi<any> = reactive({
  ...modeling,
  multiple,
  options,
  disabled,
  label,
  isMenuOpened: showPopper,
  menuToggle: togglePopper,
  size,
  noAutoClose,
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
