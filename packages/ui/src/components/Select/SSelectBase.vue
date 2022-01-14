<script setup lang="ts">
import { SelectSize, SelectOption } from './types'
import { useSelectModel } from './tools'
import { SelectApi, SELECT_API_KEY } from './api'
import { and } from '@vueuse/core'
import { usePopper } from '@/composables/popper'
import { useConditionalScope } from '@/composables/conditional-scope'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    multiple?: boolean

    modelValue?: any
    options?: SelectOption[]

    size?: SelectSize

    /**
     * This value is used if `label` slot is missing
     */
    label?: string

    /**
     * TODO
     *
     * - Doesn't allow to unselect value in single mode
     * - Doesn't allow to unselect last the only one picked value in multiple mode
     * - Picks some value automatically (the first one) if `modelValue` is null and there are some available options
     */
    mandatory?: boolean

    /**
     * @default 's-select-dropdown-transition'
     */
    dropdownTransitionName?: string

    /**
     * TODO
     */
    syncMenuAndInputWidths?: boolean
  }>(),
  {
    size: SelectSize.Md,
    options: () => [],
    modelValue: null,
    multiple: false,
    disabled: false,
    dropdownTransitionName: 's-select-dropdown-transition',
    syncMenuAndInputWidths: false,
  },
)

const emit = defineEmits<(event: 'update:modelValue', value: any) => void>()

const model = useVModel(props, 'modelValue', emit)
const multiple = computed<boolean>(() => props.multiple)
const disabled = computed<boolean>(() => props.disabled)
const options = computed<SelectOption[]>(() => props.options)
const size = computed(() => props.size)
const label = computed<string | null>(() => props.label ?? null)

const modeling = useSelectModel({
  model,
  multiple,
  options,
})

const popperRef = templateRef<HTMLDivElement | null>('popperRef')
const popper = templateRef<HTMLDivElement | null>('popper')

const { active: popperActive } = usePopper({
  popperElem: popper,
  referenceElem: popperRef,
  placement: 'bottom-start',
  active: true,
  distance: 4,
})

const [showPopper, togglePopper] = useToggle(false)

useConditionalScope(showPopper, () => {
  onClickOutside(
    popper,
    (e) => {
      const isClickInsideOfControlSlot = e.composedPath().includes(unrefElement(popperRef) as any)
      if (!isClickInsideOfControlSlot) {
        togglePopper(false)
      }
    },
    {},
  )
})

// close popper if select is disabled
whenever(and(disabled, showPopper), () => togglePopper(false), { immediate: true })

const api: SelectApi<any> = readonly({
  ...modeling,
  multiple,
  options,
  disabled,
  label,
  isMenuOpened: showPopper,
  menuToggle: togglePopper,
  size,
})

provide(SELECT_API_KEY, api)
</script>

<template>
  <div>
    <div ref="popperRef">
      <slot name="control" />
    </div>

    <div ref="popper">
      <Transition :name="dropdownTransitionName">
        <div v-show="showPopper">
          <slot name="dropdown" />
        </div>
      </Transition>
    </div>
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
