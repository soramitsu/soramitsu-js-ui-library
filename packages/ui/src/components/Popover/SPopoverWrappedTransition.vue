<script setup lang="ts">
import { mergeProps } from 'vue'
import { useWrappedTransitionVisibility } from './util'
import { usePopoverApi } from './api'

type TransitionHook = (...args: any[]) => void
type TransitionListener = TransitionHook | TransitionHook[] | undefined

defineOptions({ inheritAttrs: false })

const props = defineProps({
  eager: Boolean,
  wrapperAttrs: {
    type: Object,
    default: null,
  },
  innerWrapperAttrs: {
    type: Object,
    default: null,
  },
})

const api = usePopoverApi()

const transitionPropKeys = new Set([
  'appear',
  'css',
  'type',
  'duration',
  'mode',
  'persisted',
  'enterFromClass',
  'enterActiveClass',
  'enterToClass',
  'leaveFromClass',
  'leaveActiveClass',
  'leaveToClass',
  'appearFromClass',
  'appearActiveClass',
  'appearToClass',
])
const transitionEventKeys = new Set([
  'onBeforeEnter',
  'onEnter',
  'onAfterEnter',
  'onEnterCancelled',
  'onBeforeLeave',
  'onLeave',
  'onAfterLeave',
  'onLeaveCancelled',
  'onBeforeAppear',
  'onAppear',
  'onAfterAppear',
  'onAppearCancelled',
])

const attrs = useAttrs()

const splitAttrs = computed(() => {
  const transition: Record<string, unknown> = {}
  const listeners: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}
  let name: unknown

  for (const key in attrs) {
    if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue

    if (key === 'name') {
      name = attrs[key]
      continue
    }

    if (transitionEventKeys.has(key)) {
      listeners[key] = attrs[key]
    } else if (transitionPropKeys.has(key)) {
      transition[key] = attrs[key]
    } else {
      rest[key] = attrs[key]
    }
  }

  return { transition, listeners, rest, name }
})

const transitionName = eagerComputed(() => {
  const raw = splitAttrs.value.name
  return typeof raw === 'string' ? raw : undefined
})
const transitionAttrs = eagerComputed(() => splitAttrs.value.transition)
const transitionListeners = eagerComputed(() => splitAttrs.value.listeners)
const forwardedAttrs = eagerComputed(() => splitAttrs.value.rest)

function invokeListener(key: string, ...args: any[]) {
  const handler = transitionListeners.value[key] as TransitionListener
  if (!handler) return
  if (Array.isArray(handler)) {
    handler.forEach((fn) => fn(...args))
  } else {
    handler(...args)
  }
}

const { wrapperIf, wrapperShow, contentIf, contentShow, transitionProps } = useWrappedTransitionVisibility({
  show: computed(() => api.show),
  eager: computed(() => props.eager),
})

const transitionStateProps = eagerComputed(() => {
  const { onBeforeEnter: _ignoreBefore, onAfterLeave: _ignoreAfter, ...rest } = transitionProps
  return rest
})

function onEnter() {
  api.popper?.update()
}

const wrapper = templateRef('wrapper')
const content = templateRef('content')
const wrapperNormalized = eagerComputed(() => unrefElement(wrapper) as null | HTMLDivElement)
const contentNormalized = eagerComputed(() => unrefElement(content) as null | HTMLElement)
watch(wrapperNormalized, (el, oldEl) => {
  if (oldEl) api.deletePopperRefOverride(oldEl)
  if (el) api.addPopperRefOverride(el)
})

onScopeDispose(() => {
  const el = wrapperNormalized.value
  el && api.deletePopperRefOverride(el)
})

const transitionActiveClass = eagerComputed(() => {
  const name = transitionName.value
  return name ? `${name}-enter-active` : null
})

const afterEnterPending = ref(false)

function handleBeforeEnter(el: Element) {
  afterEnterPending.value = true
  transitionProps.onBeforeEnter?.(el as any)
  invokeListener('onBeforeEnter', el)
}

function handleEnter(el: Element) {
  onEnter()
  invokeListener('onEnter', el)
}

function handleAfterEnter(el: Element) {
  if (!afterEnterPending.value) return
  afterEnterPending.value = false
  invokeListener('onAfterEnter', el)
}

function handleEnterCancelled(el: Element) {
  afterEnterPending.value = false
  invokeListener('onEnterCancelled', el)
}

function handleBeforeLeave(el: Element) {
  invokeListener('onBeforeLeave', el)
}

function handleLeave(el: Element) {
  invokeListener('onLeave', el)
}

function handleAfterLeave(el: Element) {
  afterEnterPending.value = false
  transitionProps.onAfterLeave?.(el as any)
  invokeListener('onAfterLeave', el)
}

function handleLeaveCancelled(el: Element) {
  invokeListener('onLeaveCancelled', el)
}

function handleBeforeAppear(el: Element) {
  afterEnterPending.value = true
  transitionProps.onBeforeEnter?.(el as any)
  invokeListener('onBeforeAppear', el)
  invokeListener('onBeforeEnter', el)
}

function handleAppear(el: Element) {
  onEnter()
  invokeListener('onAppear', el)
  invokeListener('onEnter', el)
}

function handleAfterAppear(el: Element) {
  if (!afterEnterPending.value) return
  afterEnterPending.value = false
  invokeListener('onAfterAppear', el)
  invokeListener('onAfterEnter', el)
}

function handleAppearCancelled(el: Element) {
  afterEnterPending.value = false
  invokeListener('onAppearCancelled', el)
  invokeListener('onEnterCancelled', el)
}

watch([contentNormalized, transitionActiveClass, contentShow], () => {
  const wrapperEl = contentNormalized.value
  if (!wrapperEl) {
    return
  }

  const childEl = wrapperEl.firstElementChild instanceof HTMLElement ? wrapperEl.firstElementChild : null
  const cls = transitionActiveClass.value
  if (!cls) return

  const action: 'add' | 'remove' = contentShow.value ? 'add' : 'remove'
  wrapperEl.classList[action](cls)
  childEl?.classList[action](cls)
})
</script>

<template>
  <div
    v-if="wrapperIf"
    v-show="wrapperShow"
    ref="wrapper"
    v-bind="mergeProps(forwardedAttrs, wrapperAttrs)"
  >
    <Transition
      :name="transitionName"
      v-bind="mergeProps(transitionAttrs, transitionStateProps)"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @enter-cancelled="handleEnterCancelled"
      @before-leave="handleBeforeLeave"
      @leave="handleLeave"
      @after-leave="handleAfterLeave"
      @leave-cancelled="handleLeaveCancelled"
      @before-appear="handleBeforeAppear"
      @appear="handleAppear"
      @after-appear="handleAfterAppear"
      @appear-cancelled="handleAppearCancelled"
    >
      <span
        v-if="contentIf"
        v-show="contentShow"
        ref="content"
        v-bind="innerWrapperAttrs"
      >
        <slot />
      </span>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
span {
  display: inline-block;
}
</style>
