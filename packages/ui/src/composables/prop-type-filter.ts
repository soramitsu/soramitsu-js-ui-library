import { type ComputedRef } from 'vue'

const formatToLog = (value: unknown) => (typeof value === 'string' ? `'${value}'` : JSON.stringify(value))

export function usePropTypeFilter<T extends object>(props: T) {
  return function <K extends keyof T>(name: K, validValues: readonly T[K][], defaultValue: T[K]): ComputedRef<T[K]> {
    return computed(() => {
      if (validValues.includes(props[name])) {
        return props[name]
      }

      const formattedList = validValues.map(formatToLog).join(' | ')
      const formattedValue = formatToLog(props[name])

      console.warn(
        `[soramitsu-ui warn]: Invalid prop: type check failed for prop "${String(
          name,
        )}". Expected: ${formattedList}, got ${formattedValue}`,
      )

      return defaultValue
    })
  }
}
