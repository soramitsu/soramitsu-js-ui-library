import { MaybeElementRef, MaybeRef } from '@vueuse/core'
import { Merge } from 'type-fest'
import { Ref } from 'vue'
import { RadioGroupApi, RadioGroupRegisteredItemApi, RegisterRadioParams } from '.'

export function useRadiosSelector<T extends Element>(
  target: MaybeElementRef,
  selector: MaybeRef<string>,
): {
  update: (immediate?: boolean) => void
  elems: Ref<Array<T>>
} {
  const elems = shallowRef<T[]>([])
  const selectorRef = computed(() => unref(selector))
  const targetRef = computed(() => unrefElement(target))

  function doUpdate() {
    const root = targetRef.value

    if (!root) throw new Error('Element is not defined; unable to update')

    elems.value = Array.from(root.querySelectorAll(selectorRef.value))
  }

  const updateTriggerCounter = ref(0)
  let lastUpdateTriggeredCounter = 0

  // watchEffect(() => {
  //   console.log('triggers', { ...reactive({ updateTriggerCounter, lastUpdateTriggeredCounter }) })
  // })

  watch(updateTriggerCounter, (num) => {
    if (num > lastUpdateTriggeredCounter) {
      doUpdate()
      lastUpdateTriggeredCounter = num
    }
  })

  function update(immediate?: boolean) {
    if (immediate) doUpdate()
    else {
      updateTriggerCounter.value++
    }
  }

  watch(selectorRef, () => {
    targetRef.value && doUpdate()
  })

  return {
    elems,
    update,
  }
}

/**
 * Everything here is read-only and exposed by a single radio to the group
 */
export interface Radio {
  /**
   * Root element of the radio. Should be queryable by `radioSelector` for sure.
   */
  elRef: Ref<null | HTMLElement>
  /**
   * Value of the radio. It is used to determine whether radio is checked or not, as well
   * as for setting model value when the radio is activated by user (with `Space` or click)
   */
  valueRef: Ref<any>
  /**
   * Index of the radio, computed by the position of the radio's element in the array of all
   * radio elements.
   */
  index: Ref<number>
  /**
   * It is true when the value of the radio equals to the model value of the radio group
   */
  isChecked: Ref<boolean>
  /**
   * It is true when the radio's element is focused
   */
  isFocused: Ref<boolean>
}

export interface UseRadiosRegistrationReturn {
  /**
   * Should be called within a setup context of the radio button
   */
  registerRadio: RadioGroupApi['registerRadio']
  /**
   * Function to toggle focus between radios
   */
  moveFocus: (idxDelta: number) => void
  /**
   * It is needed to check focused radio with {space} key press
   */
  checkFocused: () => void
}

export function useRadiosRegistration({
  radioElements,
  model,
  updateRadioElements,
}: {
  model: Ref<any>
  radioElements: Ref<HTMLElement[]>
  updateRadioElements: () => void
}): UseRadiosRegistrationReturn {
  const radios = shallowReactive<Set<Radio>>(new Set())

  const isNothingChecked = eagerComputed<boolean>(() => {
    for (const entry of radios) {
      if (entry.isChecked.value) return false
    }
    return true
  })

  const focusedRadio = computed<null | Radio>(() => {
    for (const entry of radios) {
      if (entry.isFocused.value) {
        return entry
      }
    }

    return null
  })

  const isNothingFocused = eagerComputed<boolean>(() => !focusedRadio.value)

  function findIndexOfFocusedRadio(): number {
    return focusedRadio.value?.index?.value ?? -1
  }

  function radioByIndex(idx: number): null | Radio {
    if (idx < 0) return null

    for (const entry of radios) {
      if (entry.index.value === idx) {
        return entry
      }
    }
    return null
  }

  function moveFocus(idxDelta: number) {
    const idx = findIndexOfFocusedRadio()
    if (idx < 0) return

    const radiosCount = radioElements.value.length
    if (radiosCount === 0) return

    let nextIdx = idx + idxDelta
    nextIdx = nextIdx >= radiosCount ? 0 : nextIdx < 0 ? radiosCount - 1 : nextIdx

    const nextRadio = radioByIndex(nextIdx)
    if (!nextRadio) return

    model.value = nextRadio.valueRef.value
    nextRadio.elRef.value!.focus()
  }

  function checkFocused() {
    const radio = focusedRadio.value
    if (radio) {
      model.value = radio.valueRef.value
    }
  }

  function registerRadio({ elRef, valueRef }: RegisterRadioParams): RadioGroupRegisteredItemApi {
    const { focused: isFocused } = useFocus({ target: elRef })

    const index = eagerComputed<number>(() => (elRef.value ? radioElements.value.indexOf(elRef.value) : -1))

    const isItTheFirstRadioInTheGroup = eagerComputed<boolean>(() => index.value === 0)

    const isChecked = eagerComputed<boolean>(() => model.value === valueRef.value)

    const isTabbable = eagerComputed(
      () =>
        isFocused.value ||
        (isNothingFocused.value && isChecked.value) ||
        (isNothingChecked.value && isItTheFirstRadioInTheGroup.value),
    )

    const tabindex = computed(() => (isTabbable.value ? 0 : -1))

    // watchEffect(() => {
    //   console.log(
    //     'Radio state; value: %O; checked: %O; tabbable: %O; index: %O',
    //     valueRef.value,
    //     isChecked.value,
    //     isTabbable.value,
    //     index.value,
    //   )
    // })

    function check() {
      model.value = valueRef.value
    }

    const registeredEntry: Radio = {
      elRef,
      valueRef,
      index,
      isChecked,
      isFocused,
    }

    watch(elRef, (x) => x && updateRadioElements(), { flush: 'sync' })

    onMounted(() => {
      radios.add(registeredEntry)
    })

    onUnmounted(() => {
      radios.delete(registeredEntry)
      updateRadioElements()
    })

    return readonly<
      Merge<
        RadioGroupRegisteredItemApi,
        {
          isChecked: Ref<boolean>
          tabindex: Ref<number>
        }
      >
    >({
      check,
      isChecked,
      tabindex,
    })
  }

  return { registerRadio, moveFocus, checkFocused }
}
