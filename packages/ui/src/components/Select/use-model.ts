import { Ref } from 'vue'
import { SelectOption, SelectOptionGroup } from './types'
import { whenever, and, not } from '@vueuse/core'
import { isSelectOptions } from '@/components/Select/utils'

export interface UseSelectModelReturn<T> {
  /**
   * Toggle value's selection state. Works different in single/multiple modes.
   */
  toggleSelection: (value: T) => void
  toggleGroupSelection: (optionsGroup: SelectOptionGroup<T>) => void
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
  isGroupSelected: (optionsGroup: SelectOptionGroup<T>) => boolean
}

export interface UseSelectModelParams<T> {
  multiple: Ref<boolean>
  model: Ref<null | T | T[]>
  options: Ref<SelectOption<T>[] | SelectOptionGroup<T>[]>

  singleModeAutoClose: Ref<boolean>
  /**
   * Should be used to actually perform menu closing
   */
  onAutoClose: () => void
}

export function useSelectModel<T = any>({
  multiple,
  model,
  options,
  singleModeAutoClose,
  onAutoClose,
}: UseSelectModelParams<T>): UseSelectModelReturn<T> {
  const triggerAutoClose = () => singleModeAutoClose.value && onAutoClose()

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

  function isGroupSelected(optionGroup: SelectOptionGroup<T>) {
    return optionGroup.items.every((x) => selectedSet.value.has(x.value))
  }

  function select(value: T): void {
    if (multiple.value) {
      model.value = [...new Set([...modelAsArray.value, value])]
    } else {
      model.value = value
      triggerAutoClose()
    }
  }

  function unselect(value: T) {
    if (multiple.value) {
      model.value = modelAsArray.value.filter((x) => x !== value)
    } else {
      model.value = null
      triggerAutoClose()
    }
  }

  function toggleSelection(value: T): void {
    isValueSelected(value) ? unselect(value) : select(value)
  }

  function toggleGroupSelection(optionGroup: SelectOptionGroup<T>): void {
    if (isGroupSelected(optionGroup)) {
      const optionGroupSet = new Set(optionGroup.items.map((x) => x.value))
      model.value = modelAsArray.value.filter((x) => !optionGroupSet.has(x))

      return
    }

    model.value = [...new Set([...modelAsArray.value, ...optionGroup.items.map((x) => x.value)])]
  }

  const optionItems = computed(() => {
    if (isSelectOptions(options.value)) {
      return options.value
    }

    return options.value.flatMap((x) => x.items)
  })

  const selectedOptions = computed<SelectOption[]>(() => optionItems.value.filter((x) => isValueSelected(x.value)))

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
    toggleGroupSelection,
    select,
    unselect,
    isSomethingSelected,
    isGroupSelected,
  }
}
