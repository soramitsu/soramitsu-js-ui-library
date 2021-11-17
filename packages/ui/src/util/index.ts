import { InjectionKey, inject, Ref } from 'vue'

export function forceInject<T>(key: string | InjectionKey<T>): T {
  const something = inject(key)
  if (!something) throw new Error(`Injection of "${key}" failed`)
  return something
}

/**
 * Useful for render functions
 * @param model
 * @returns
 */
export function bareMetalVModel<T, K extends string = 'modelValue'>(
  model: Ref<T>,
  prop: K = 'modelValue' as K,
): {
  [key in `${K}`]: T
} & {
  [key in `onUpdate:${K}`]: (value: T) => void
} {
  return {
    [prop]: model.value as T,
    [`onUpdate:${prop}`]: (v: T) => {
      model.value = v
    },
  } as any
}
