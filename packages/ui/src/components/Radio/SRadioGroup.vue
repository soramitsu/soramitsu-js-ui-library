<script setup lang="ts">
import { Ref } from 'vue'
import { RADIO_GROUP_API_KEY, RadioGroupRegisteredItemApi } from './api'
import { Merge } from 'type-fest'
import { or, and } from '@vueuse/core'

interface Props {
  modelValue?: null | symbol | string | number | object

  /**
   * Used to distinguish non-primitive values from each other
   */
  valueKey?: null | ((value: any) => string | number | symbol | object)

  /**
   * @default '[role=radio]'
   */
  radioSelector?: string

  labelledBy?: string
  describedBy?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  valueKey: null,
  radioSelector: '[role=radio]',
})

const emit = defineEmits(['update:modelValue'])

// Modeling

const model = useVModel(props, 'modelValue', emit, { passive: true })

const isNothingSelected = computed<boolean>(() => model.value === null)

// First radio element

const root = templateRef('root')
const firstRadio = shallowRef<Element | null>(null)

function findFirstRadio() {
  const el = unrefElement(root)
  if (!el) {
    throw new Error(`root element is not set`)
  }

  return el.querySelector(props.radioSelector)
}

const firstRadioUpdateFlag = ref(false)
whenever(
  firstRadioUpdateFlag,
  () => {
    firstRadio.value = findFirstRadio()
  },
  { flush: 'post' },
)

function updateFirstRadio() {
  firstRadioUpdateFlag.value = true
}

// API

const EMPTY_RADIO_VALUE = Symbol('Empty')

function registerRadio(): RadioGroupRegisteredItemApi {
  const radioEl = shallowRef<HTMLElement | null>(null)
  const radioValue = shallowRef<any>(EMPTY_RADIO_VALUE)

  const radioValueKey = computed<typeof EMPTY_RADIO_VALUE | any>(() => {
    const val = radioValue.value

    if (val === EMPTY_RADIO_VALUE) return val
    if (props.valueKey) {
      try {
        return props.valueKey(val)
      } catch (err) {
        console.error('Computation of a key for the value %o is failed: %o', val, err)
        return EMPTY_RADIO_VALUE
      }
    }
    return val
  })

  const isItTheFirstRadioInTheGroup = computed<boolean>(() => !!firstRadio.value && radioEl.value === firstRadio.value)

  const isChecked = computed<boolean>(() => {
    const val = radioValueKey.value
    return val !== EMPTY_RADIO_VALUE && model.value === val
  })

  const isTabbable = or(isChecked, and(isNothingSelected, isItTheFirstRadioInTheGroup))

  function check() {
    const val = radioValueKey.value
    model.value = val === EMPTY_RADIO_VALUE ? null : val
  }

  onUnmounted(() => updateFirstRadio())

  return readonly<
    Merge<
      RadioGroupRegisteredItemApi,
      {
        isChecked: Ref<boolean>
        isTabbable: Ref<boolean>
      }
    >
  >({
    setEl: (val) => {
      radioEl.value = val
      updateFirstRadio()
    },
    setValue: (val) => {
      radioValue.value = val
    },
    check,
    isChecked,
    isTabbable,
  })
}

provide(RADIO_GROUP_API_KEY, readonly({ registerRadio }))

// ETC

const aria = computed(() => {
  const attrs: Record<string, string> = {}

  if (props.labelledBy) {
    attrs['aria-labelledby'] = props.labelledBy
  }
  if (props.describedBy) {
    attrs['aria-describedby'] = props.describedBy
  }

  return attrs
})
</script>

<template>
  <div
    ref="root"
    role="radiogroup"
    v-bind="aria"
  >
    <slot v-bind="{ labelledBy }" />
  </div>
</template>
