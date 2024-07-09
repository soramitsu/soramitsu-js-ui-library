import type { InjectionKey, Ref, Component, FunctionalComponent } from 'vue'
import { inject } from 'vue'

export function forceInject<T>(key: string | InjectionKey<T>): T {
  const something = inject(key)
  if (!something) throw new Error(`Injection of "${String(key)}" failed`)
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

export function getComponentName(comp: Component): string | undefined {
  if (typeof comp === 'function') {
    const funcComponent = comp as FunctionalComponent

    return funcComponent.displayName || funcComponent.name
  }
  return comp.name || comp.__name
}

let incrementalCounter = 0

/*
  Returns global unique id
 */
export function nextIncrementalCounter(): number {
  return incrementalCounter++
}

export function uniqueElementId(): string {
  return `soraui-uid-${nextIncrementalCounter()}`
}
