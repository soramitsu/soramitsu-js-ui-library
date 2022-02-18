<script setup lang="ts">
import { Ref } from 'vue'
import { RADIO_GROUP_API_KEY, RadioGroupRegisteredItemApi, RegisterRadioParams } from './api'
import type { Merge } from 'type-fest'
import { or, and } from '@vueuse/core'

interface Props {
  modelValue?: null | symbol | string | number | object

  // /**
  //  * Used to distinguish non-primitive values from each other
  //  */
  // valueKey?: null | ((value: any) => string | number | symbol | object)

  /**
   * @default '[role=radio]'
   */
  radioSelector?: string

  labelledBy?: string
  describedBy?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  // valueKey: null,
  radioSelector: '[role=radio]',
})

const emit = defineEmits(['update:modelValue'])

// MODELING

const model = useVModel(props, 'modelValue', emit, { passive: true })

// const isNothingSelected = eagerComputed<boolean>(() => model.value === null)

// CHILD RADIOS QUERYING

const root = templateRef('root')

const childRadios = shallowRef<HTMLElement[]>([])

function updateChildRadios() {
  const el = unrefElement(root)
  if (!el) {
    throw new Error(`root element is not set`)
  }

  childRadios.value = Array.from(el.querySelectorAll(props.radioSelector))
  console.log( 'children radios updated', childRadios.value)
}

const updateChildRadiosFlag = ref(false)
whenever(updateChildRadiosFlag, updateChildRadios, { flush: 'post' })
function triggerChildRadiosUpdate() {
  updateChildRadiosFlag.value = true
}

// API

interface RegisteredRadio {
  el: Ref<null | HTMLElement>
  value: Ref<any>
  index: Ref<number>
  isChecked: Ref<boolean>
  isFocused: Ref<boolean>
}


// let incrementalRegisterKey = 0
// const registeredNew = shallowReactive<Map<number, >>()


const registeredRadios = shallowReactive<Set<RegisteredRadio>>(new Set())

watch(
  () => [...registeredRadios.values()].map(x => x.el.value),
  ()=> {
    console.log('registered elements are updated')
    updateChildRadios()
  },
  { flush: 'post'}
)

// const registeredRadioselemen

// watch(registeredRadios, () => {
//   console.log('Registered set watch', [...registeredRadios])
// }, { deep: false })

// const registeredRadiosMapFromElements = computed<Map<HTMLElement, RegisteredRadio>>(() => {
//   console.log('computing registered radios map')
//   // return new Map()
//   // // // console.log('Registered set', [...registeredRadios])

//   return new Map([...registeredRadios].filter((x) => !!x.el.value).map((x) => [x.el.value!, x]))
// })

// watch(() => [...registeredRadiosMapFromElements.value.keys()], () => {
//   console.log('keys recomputed')
// })

// watch(registeredRadiosMapFromElements, (x) => {
//   // console.log('watch fired...')
//   updateChildRadios()
// }, { flush: 'post'})

// const checkedIndexByRegistered = eagerComputed<number>(() => {
//   console.log('computing index of checked')
//   for (const entry of registeredRadios) {
//     if (entry.isChecked.value) {
//       return entry.index.value
//     }
//   }
//   return -1
// })



const isNothingSelected = eagerComputed<boolean>(() =>
  {
    for (const entry of registeredRadios) {
      if (entry.isChecked.value) return false
    }
    return true
  }
)

watchEffect(() => {
  console.log('Nothing selected?', isNothingSelected.value)
})

interface FocusTargetDescriptor {
  value: any
  elem: HTMLElement
}

// const focusedIndexByRegistered = computed<number>(() => {
//   for (const entry of registeredRadios) {
//     if (entry.isFocused.value) {
//       return entry.index.value
//     }
//   }
//   return -1
// })

function indexOfFocused(): number {
  for (const entry of registeredRadios) {
    if (entry.isFocused.value) {
      return entry.index.value
    }
  }
  return -1

}

function registeredByIndex(idx: number): null | RegisteredRadio {
    for (const entry of registeredRadios) {
    if (entry.index.value === idx) {
      return entry
    }
  }
  return null

}


function seekFromFocusedRadio(idxDelta: number): null | RegisteredRadio {
  const idx = indexOfFocused()
  if (idx < 0) return null

  const radiosDeFacto = childRadios.value
  if (radiosDeFacto.length === 0) return null

  let nextIdx = idx + idxDelta
  nextIdx = nextIdx >= length ? 0 : nextIdx < 0 ? length - 1 : nextIdx

  return registeredByIndex(nextIdx)

  // for (const entry )

  // return radiosDeFacto[nextIdx]
}

const nextFromFocused = computed<null | RegisteredRadio>(() => seekFromFocusedRadio(1))
const previousFromFocused = computed<null | RegisteredRadio>(() => seekFromFocusedRadio(-1))

// const registeredElementsOrdered = computed<Element[]>(() => {})

function registerRadio({ elem: radioEl, value: radioValue }: RegisterRadioParams): RadioGroupRegisteredItemApi {

  watchEffect(() => {
    console.log('effect radio elem', radioEl.value)
  })
  // const radioEl = shallowRef<Element | null>(null)
  // const radioValue = shallowRef<any>(EMPTY_RADIO_VALUE)

  // const radioValueKey = computed<typeof EMPTY_RADIO_VALUE | any>(() => {
  //   const val = radioValue.value

  //   if (val === EMPTY_RADIO_VALUE) return val
  //   if (props.valueKey) {
  //     try {
  //       return props.valueKey(val)
  //     } catch (err) {
  //       console.error('Computation of a key for the value %o is failed: %o', val, err)
  //       return EMPTY_RADIO_VALUE
  //     }
  //   }
  //   return val
  // })

  console.log('Registering', radioValue.value)

  const radioIndex = eagerComputed<number>(() => ((radioEl.value ? childRadios.value.indexOf(radioEl.value) : -1)))

  const isItTheFirstRadioInTheGroup = eagerComputed<boolean>(() => ( radioIndex.value === 0))

  const isChecked = eagerComputed<boolean>(() => model.value === radioValue.value)

  const isTabbable = eagerComputed(() => isChecked.value || (isNothingSelected.value && isItTheFirstRadioInTheGroup.value))

  const { focused: isFocused } = useFocus({ target: radioEl })

  watchEffect(() => {
    console.log('Radio state; value: %o; checked: %o; tabbable: %o; index: %o', radioValue.value, isChecked.value, isTabbable.value, radioIndex.value)
  })

  function check() {
    model.value = radioValue.value
  }

  const registeredEntry: RegisteredRadio = ({
    el: radioEl,
    value: radioValue,
    index: radioIndex,
    isChecked,
isFocused
  })

  onMounted(() => {
    console.log('adding', radioValue.value)
    registeredRadios.add(registeredEntry)

  })


  onScopeDispose(() => {
    console.log('deleting')
    registeredRadios.delete(registeredEntry)
  })

  onUnmounted(() => {
    triggerChildRadiosUpdate()
  })

  return readonly<
    Merge<
      RadioGroupRegisteredItemApi,
      {
        isChecked: Ref<boolean>
        isTabbable: Ref<boolean>
      }
    >
  >({
    // setEl: (val) => {
    //   radioEl.value = val
    //   triggerChildRadiosUpdate()
    // },
    // setValue: (val) => {
    //   radioValue.value = val
    // },
    check,
    isChecked,
    isTabbable,
  })
}

provide(RADIO_GROUP_API_KEY, readonly({ registerRadio }))

// Keyboard navigation

function handleKeydown(e: KeyboardEvent) {

  switch (e.code) {
    case 'ArrowDown':
    case 'ArrowRight':
      tryGoToRadio(nextFromFocused.value)
      break

    case 'ArrowUp':
    case 'ArrowLeft':
      tryGoToRadio(previousFromFocused.value)
      break
  }
}

function tryGoToRadio(reg: RegisteredRadio | null) {
  if (!reg)  return


  // console.log('going to', elem)

  // if (!elem) return

  // const api = registeredRadiosMapFromElements.value.get(elem)
  // if (!api) return

  model.value = reg.value.value

  // focusing immediately
  reg.el.value!.focus()
}

// function keyboardForward() {
//   tryGoToRadio(nextRadioElement.value)

//   // find next element in the sequence
//   // set the value of its radio component
//   // radio component should automatically focus on itself... or focus immediately, before re-render?

//   const nextElement = nextRadioElement.value
//   if (!nextElement) return

//   const api = registeredRadiosMapFromElements.value.get(nextElement)
//   if (!api) return

//   model.value = api.value.value
//   // focusing immediately
//   nextElement.focus()
// }

// function keyboardBackward() {}

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
    @keydown="handleKeydown"
  >
    <slot v-bind="{ labelledBy }" />
  </div>
</template>
