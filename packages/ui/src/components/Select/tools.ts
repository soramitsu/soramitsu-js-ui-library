import { Ref } from 'vue'
import { SelectOption } from './types'
import { whenever, and, not } from '@vueuse/core'

export interface UseSelectModelReturn<T> {
  /**
   * Toggle value's selection state. Works different in single/multiple modes.
   */
  toggleSelection: (value: T) => void
  select: (value: T) => void
  unselect: (value: T) => void

  /**
   * Universal checking tool, agnostic to selection mode
   */
  isValueSelected: (value: T) => boolean

  /**
   * List of selected options (with only one item maximum in a single mode)
   */
  selectedOptions: Ref<SelectOption<T>[]>

  isSomethingSelected: Ref<boolean>
}

export interface UseSelectModelParams<T> {
  multiple: Ref<boolean>
  model: Ref<null | T | T[]>
  options: Ref<SelectOption<T>[]>
}

export function useSelectModel<T = any>({
  multiple,
  model,
  options,
}: UseSelectModelParams<T>): UseSelectModelReturn<T> {
  const modelAsArray = computed<T[]>(() => {
    const val = model.value
    if (Array.isArray(val)) return val
    if (val !== null) return [val]
    return []
  })

  const selectedSet = computed<Set<T>>(() => {
    return new Set(modelAsArray.value)
  })

  function isValueSelected(value: T): boolean {
    return selectedSet.value.has(value)
  }

  function select(value: T): void {
    if (multiple.value) {
      model.value = [...new Set([...modelAsArray.value, value])]
    } else {
      model.value = value
    }
  }

  function unselect(value: T) {
    if (multiple.value) {
      model.value = modelAsArray.value.filter((x) => x !== value)
    } else {
      model.value = null
    }
  }

  function toggleSelection(value: T): void {
    isValueSelected(value) ? unselect(value) : select(value)
  }

  const selectedOptions = computed<SelectOption[]>(() => options.value.filter((x) => isValueSelected(x.value)))

  const isSomethingSelected = computed<boolean>(() => !!selectedSet.value.size)

  const isModelAnArray = computed<boolean>(() => Array.isArray(model.value))

  function modelFromSingleToMultiple() {
    const current = model.value as null | T
    model.value = current === null ? [] : [current]
  }

  function modelFromMultipleToSingle() {
    const current = model.value as T[]
    model.value = current.length ? current[0] : null
  }

  whenever(and(isModelAnArray, not(multiple)), modelFromMultipleToSingle, { immediate: true })
  whenever(and(not(isModelAnArray), multiple), modelFromSingleToMultiple, { immediate: true })

  return {
    isValueSelected,
    selectedOptions,
    toggleSelection,
    select,
    unselect,
    isSomethingSelected,
  }
}
