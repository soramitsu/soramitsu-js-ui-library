import { createPopper, VirtualElement, Instance, Placement } from '@popperjs/core'
import { MaybeRef, and } from '@vueuse/core'
import { computed, watch, unref, ref, shallowRef, onScopeDispose, Ref } from 'vue'

export interface UsePopperParams {
  referenceElem: MaybeRef<Element | VirtualElement | null>
  popperElem: MaybeRef<HTMLElement | null>

  /**
   * Initial active value
   * @default true
   */
  active?: boolean

  placement?: MaybeRef<Placement>

  /**
   * https://popper.js.org/docs/v2/modifiers/offset/#skidding-1
   */
  skidding?: MaybeRef<number>

  /**
   * https://popper.js.org/docs/v2/modifiers/offset/#skidding-1
   */
  distance?: MaybeRef<number>
}

export interface UsePopperReturn {
  active: Ref<boolean>
}

export function usePopper(params: UsePopperParams): UsePopperReturn {
  const elemReference = computed(() => unref(params.referenceElem))
  const elemPopper = computed(() => unref(params.popperElem))
  const placement = computed<Placement>(() => unref(params.placement ?? 'auto'))
  const skiddingAndOffset = computed<[number, number]>(() => [unref(params.skidding) ?? 0, unref(params.distance) ?? 0])

  const bothElemsExist = and(elemReference, elemPopper)
  const active = ref(params.active ?? true)
  const popperShouldExist = and(bothElemsExist, active)

  const inst = shallowRef<Instance | null>(null)

  function initInstance() {
    inst.value = createPopper(elemReference.value!, elemPopper.value!, {
      placement: placement.value,
      modifiers: [
        {
          name: 'offset',
          options: { offset: skiddingAndOffset.value },
        },
      ],
    })
  }

  function disposeInstance() {
    inst.value?.destroy()
  }

  watch(popperShouldExist, (flag) => (flag ? initInstance() : disposeInstance()), { immediate: true })
  onScopeDispose(disposeInstance)

  // updating opts
  watch(placement, (val) => {
    if (inst.value) {
      inst.value.setOptions({ placement: val })
    }
  })
  watch(skiddingAndOffset, (val) => {
    inst.value?.setOptions({ modifiers: [{ name: 'offset', options: { offset: val } }] })
  })

  return { active }
}
