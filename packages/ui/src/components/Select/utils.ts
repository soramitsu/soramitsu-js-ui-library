import type { OptionDataGetters, ParsedOptions } from '@/components'
import { type MaybeRefOrGetter, type Ref, toValue } from 'vue'
import { ParsedOptions } from '@/components/Select/types'

export function useParsedOptions<T>(params: {
  options: MaybeRefOrGetter<readonly T[]>
  optionGetAsGroup: MaybeRefOrGetter<null | OptionDataGetters<T, unknown>['asGroup']>
}): Ref<ParsedOptions<T>> {
  return computed(() => {
    const asGroup = toValue(params.optionGetAsGroup)

    if (asGroup)
      return toValue(params.options).map((option) => {
        const group = asGroup(option)
        return group
          ? {
              kind: 'group',
              key: group.key,
              label: group.label,
              options: group.options,
            }
          : { kind: 'item', raw: option }
      })

    return toValue(params.options).map((option) => ({ kind: 'item', raw: option }))
  })
}

/**
 * When getter specified as a string, transforms it into `() => obj[key]` getter.
 */
export function normaliseGetter<T extends object, U>(getter: string | ((value: T) => U)): (value: T) => U {
  return typeof getter === 'string' ? (x) => (x as any)[getter] : getter
}

export function* optionsIter<T>(parsed: ParsedOptions<T>): Generator<T> {
  for (const x of parsed) {
    if (x.kind === 'item') yield x.raw
    else for (const y of x.options) yield y
  }
}

export type ValueByMultiplicity<T> =
  | {
      mode: 'single'
      value: null | T
    }
  | {
      mode: 'multiple'
      value: T[]
    }

export function parseByMultiplicity<T>(value: null | T | T[], multiple: boolean): ValueByMultiplicity<T> {
  return multiple
    ? {
        mode: 'multiple',
        value: Array.isArray(value) ? value : value ? [value] : [],
      }
    : {
        mode: 'single',
        value: Array.isArray(value) ? value.at(0) ?? null : value,
      }
}
