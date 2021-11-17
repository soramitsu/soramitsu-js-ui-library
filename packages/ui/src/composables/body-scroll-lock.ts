import { enableBodyScroll, disableBodyScroll, BodyScrollOptions } from 'body-scroll-lock'
import { MaybeElementRef, unrefElement } from '@vueuse/core'
import { watch, computed, onScopeDispose } from 'vue'

/**
 * note: options are not reactive
 *
 * tip: if you want to make it conditional, pass maybe-null-ref as target
 */
export function useBodyScrollLock(target: MaybeElementRef, options?: BodyScrollOptions) {
  const targetNormalized = computed(() => unrefElement(target))

  watch(
    targetNormalized,
    (elem, prevElem) => {
      if (prevElem) {
        enableBodyScroll(prevElem)
      }

      if (elem) {
        disableBodyScroll(elem, options)
      }
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    const elem = targetNormalized.value
    elem && enableBodyScroll(elem)
  })
}
