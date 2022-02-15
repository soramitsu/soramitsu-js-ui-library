import { ComputedRef } from 'vue';

export function usePropTypeFilter<T>(value: () => T, validValues: readonly T[], defaultValue: T): ComputedRef<T> {
  return computed(() => {
    if (validValues.includes(value())) {
      return value()
    }

    return defaultValue
  })
}
