import type { MaybeRefOrGetter, Ref, ShallowRef } from 'vue'
import { toValue } from 'vue'
import type { OptionDataGetters, ParsedOptions } from './types'
import { optionsIter, parseByMultiplicity, ValueByMultiplicity } from './utils'

export interface UseSelectModelParams<T, U> {
  /**
   * Whether multiple choice is allowed or not.
   */
  multiple: MaybeRefOrGetter<boolean>
  optionsParsed: MaybeRefOrGetter<ParsedOptions<T>>
  /**
   * Intended to be a reactive object
   */
  optionGetters: Pick<OptionDataGetters<T, U>, 'value'>
  /**
   * Intended to be mutated from the inside of the composable
   */
  modelAsValues: Ref<undefined | null | U | U[]>
}

export interface UseSelectModelReturn<T> {
  modelAsOptions: Ref<null | T | T[]>
}

/**
 * What this composable does:
 *
 * - Having a model in *values*, constructs reactive model in *options* mapped from the values.
 * - Reactively transforms model according to the multiplicity mode (e.g. if the model value is `T`
 *   and `multiple: true`, it transforms model to `[T]`, and vice versa).
 *
 * Drawback: `modelAsOptions` should not be mutated, but replaced with a new value:
 *
 * ```js
 * modelAsOptions.value = [{ value: 1 }]
 * ```
 */
export function useSelectModel<T, U>(params: UseSelectModelParams<T, U>): UseSelectModelReturn<T> {
  const modelAsValuesByMultiplicity = shallowRef() as ShallowRef<ValueByMultiplicity<U>>

  watch(
    [params.modelAsValues, params.multiple],
    ([model, multiple]) => {
      const parsed = parseByMultiplicity(model ?? null, multiple)
      modelAsValuesByMultiplicity.value = parsed
      if (parsed.value !== model) {
        // normalise the model value
        params.modelAsValues.value = parsed.value
      }
    },
    { immediate: true, flush: 'sync' },
  )

  const modelAsOptions = computed<null | T | T[]>({
    get() {
      const parsed = modelAsValuesByMultiplicity.value

      if (parsed.mode === 'multiple') {
        if (!parsed.value.length) return []
        const valuesSet: Set<U> = new Set(parsed.value)
        const predicate = (option: T) => valuesSet.has(params.optionGetters.value(option))
        const options: T[] = []
        for (const x of optionsIter(toValue(params.optionsParsed))) {
          if (predicate(x)) options.push(x)
        }
        return options
      } else {
        // single
        if (!parsed.value) return null
        for (const x of optionsIter(toValue(params.optionsParsed))) {
          if (parsed.value === params.optionGetters.value(x)) return x
        }
        return null
      }
    },
    set(value) {
      const parsed = parseByMultiplicity(value, params.multiple.value)
      if (parsed.mode === 'multiple') {
        params.modelAsValues.value = parsed.value.map((x) => params.optionGetters.value(x))
      } else {
        params.modelAsValues.value = parsed.value && params.optionGetters.value(parsed.value)
      }
    },
  })

  return { modelAsOptions }
}
