<script lang="ts">
export default defineComponent({
  name: 'SPopoverWrappedTransition',
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { mergeProps } from 'vue'
import { useWrappedTransitionVisibility } from './util'
import { usePopoverApi } from './api'

interface Props {
  eager?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  eager: false,
})

const api = usePopoverApi()

const { wrapperIf, wrapperShow, contentIf, contentShow, transitionProps } = useWrappedTransitionVisibility({
  show: computed(() => api.show),
  eager: computed(() => props.eager),
})

function onEnter() {
  api.popper?.update()
}
</script>

<template>
  <div
    v-if="wrapperIf"
    v-show="wrapperShow"
  >
    <Transition
      v-bind="mergeProps($attrs, transitionProps)"
      @enter="onEnter"
    >
      <div
        v-if="contentIf"
        v-show="contentShow"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
