import { Ref, cloneVNode, PropType } from 'vue'
import { Placement, placements } from '@popperjs/core'
import { not, or } from '@vueuse/core'
import { usePopper } from '@/composables/popper'
import { PopoverApi, POPOVER_API_KEY } from './api'

function useDelayNumberGreaterThanOrEqualToZero(reactiveGetter: () => string | number): Ref<number> {
  return computed(() => {
    const val = reactiveGetter()
    const num = typeof val === 'number' ? val : Number(val)
    return Math.max(0, num)
  })
}

function useNumberCast(reactiveGetter: () => string | number): Ref<number> {
  return computed(() => Number(reactiveGetter()))
}

function useDelayedShow(show: Ref<boolean>, delays: { show: Ref<number>; hide: Ref<number> }): Ref<boolean> {
  const delayed = ref(show.value)

  debouncedWatch(
    show,
    (flag) => {
      if (flag) {
        delayed.value = true
      }
    },
    { debounce: delays.show },
  )

  debouncedWatch(
    not(show),
    (flag) => {
      if (flag) {
        delayed.value = false
      }
    },
    { debounce: delays.hide },
  )

  return delayed
}

function templateElementRef(name: string) {
  const tmp = templateRef(name)
  const elem = eagerComputed(() => {
    const el = unrefElement(tmp)
    if (!el) return null
    if (el.nodeType !== Node.ELEMENT_NODE) return null
    return el
  })
  return elem
}

function useElHover(elemRef: Ref<null | Element>): {
  hover: Ref<boolean>
  listeners: { onMouseenter: () => void; onMouseleave: () => void }
} {
  const hover = ref(false)

  watch(elemRef, (el, oldEl) => {
    if (oldEl) hover.value = false
  })

  return {
    hover,
    listeners: {
      onMouseenter: () => {
        hover.value = true
      },
      onMouseleave: () => {
        hover.value = false
      },
    },
  }
}

/**
 * HOC-wrapper for `@popperjs/core` with many convenient features out of the box:
 *
 * - Automatic popup at hover (default), click, focus
 * - ...or manual control over visibility
 * - Listens for clicks outside of popper
 * - Show/hide delay (optional)
 *
 * Partially based on:
 * https://github.com/TuSimple/naive-ui/blob/195c94a0c3610ee4492676dbbe0e781333658218/src/popover/src/Popover.tsx
 */
export default defineComponent({
  name: 'SPopover',
  props: {
    show: Boolean,
    trigger: {
      type: String as PropType<'manual' | 'hover' | 'click'>,
      default: 'hover',
      validator: (v: unknown) => v === 'manual' || v === 'hover' || v === 'click',
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'auto',
      validator: (v: unknown) => placements.includes(v as any),
    },
    skidding: {
      type: [Number, String],
      default: 0,
    },
    distance: {
      type: [Number, String],
      default: 0,
    },
    showDelay: {
      type: [Number, String],
      default: 0,
    },
    hideDelay: {
      type: [Number, String],
      default: 0,
    },
  },
  emits: ['update:show', 'click-outside'],
  setup(props, { slots, emit }) {
    const showDelay = useDelayNumberGreaterThanOrEqualToZero(() => props.showDelay)
    const hideDelay = useDelayNumberGreaterThanOrEqualToZero(() => props.hideDelay)
    const skidding = useNumberCast(() => props.skidding)
    const distance = useNumberCast(() => props.distance)

    const triggerRef = templateElementRef('trigger')
    const popperRef = templateElementRef('popper')

    const { instance } = usePopper({
      referenceElem: triggerRef as Ref<null | Element>,
      popperElem: popperRef as Ref<null | HTMLElement>,
      options: reactive({
        placement: computed(() => props.placement),
        modifiers: [
          {
            name: 'offset',
            options: { offset: computed(() => [skidding.value, distance.value]) },
          },
        ],
      }),
    })

    const show = useVModel(props, 'show', emit, { passive: true })
    const showDelayed = useDelayedShow(show, { show: showDelay, hide: hideDelay })
    const showFinal = showDelayed

    const { hover: triggerHover, listeners: triggerHoverListeners } = useElHover(triggerRef)
    const { hover: popperHover, listeners: popperHoverListeners } = useElHover(popperRef)
    const sharedHover = or(triggerHover, popperHover)

    debouncedWatch(
      () => props.trigger === 'hover' && [sharedHover.value],
      (maybeHover) => {
        if (maybeHover) {
          const [val] = maybeHover
          show.value = val
        }
      },
      { debounce: 50 },
    )

    function onTriggerClick() {
      if (props.trigger === 'click') {
        show.value = !show.value
      }
    }

    onClickOutside(popperRef, (ev) => {
      const doesPathIncludeTrigger = ev.composedPath().includes(unrefElement(triggerRef) as any)
      if (!doesPathIncludeTrigger) {
        emit('click-outside')
        if (props.trigger === 'click') {
          show.value = false
        }
      }
    })

    const api = readonly(
      reactive({
        show: showFinal,
        popper: instance,
      }) as PopoverApi,
    ) as PopoverApi

    provide(POPOVER_API_KEY, api)

    return () => {
      let trigger
      {
        if (!slots.trigger) {
          throw new Error('"trigger" slot is required')
        }

        const nodes = slots.trigger()
        if (nodes.length !== 1) {
          throw new Error('"trigger" slot should render exact 1 element')
        }
        ;[trigger] = nodes
      }

      let popper

      if (!slots.popper) {
        popper = null
      } else {
        const nodes = slots.popper(api)
        if (!nodes.length) {
          popper = null
        } else if (nodes.length === 1) {
          ;[popper] = nodes
        } else {
          throw new Error('"popper" slot should return either nothing either the only 1 element')
        }
      }

      return [
        cloneVNode(
          trigger,
          {
            ref: 'trigger',
            ...triggerHoverListeners,
            onClick: onTriggerClick,
          },
          true,
        ),
        popper &&
          cloneVNode(
            popper,
            {
              ref: 'popper',
              ...popperHoverListeners,
            },
            true,
          ),
      ]
    }
  },
})
