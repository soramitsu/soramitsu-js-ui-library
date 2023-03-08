<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { mergeProps } from 'vue'
import { useWrappedTransitionVisibility } from './util'
import { usePopoverApi } from './api'

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

const { wrapperIf, wrapperShow, contentIf, contentShow, transitionProps } = useWrappedTransitionVisibility({
  show: computed(() => api.show),
  eager: computed(() => props.eager),
})

function onEnter() {
  api.popper?.update()
}

const wrapper = templateRef<null | HTMLDivElement>('wrapper')
const wrapperNormalized = eagerComputed(() => unrefElement(wrapper) as null | HTMLDivElement)
watch(wrapperNormalized, (el, oldEl) => {
  if (oldEl) api.deletePopperRefOverride(oldEl)
  if (el) api.addPopperRefOverride(el)
})

onScopeDispose(() => {
  const el = wrapperNormalized.value
  el && api.deletePopperRefOverride(el)
})
</script>

<template>
  <div
    v-if="wrapperIf"
    v-show="wrapperShow"
    ref="wrapper"
    v-bind="wrapperAttrs"
  >
    <Transition
      v-bind="mergeProps($attrs, transitionProps)"
      @enter="onEnter"
    >
      <span
        v-if="contentIf"
        v-show="contentShow"
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
