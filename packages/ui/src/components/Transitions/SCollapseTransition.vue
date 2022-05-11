<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      duration?: string,
    }>(),
    {
      duration: '150ms'
    },
)

function setContentClosed(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = '0'
  }
}

function setContentOpened(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = el.scrollHeight + 'px'
  }
}

function handleContentToggleEnd(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = ''
  }
}
</script>

<template>
  <transition
    name="collapse"
    @before-enter="setContentClosed"
    @enter="setContentOpened"
    @after-enter="handleContentToggleEnd"
    @before-leave="setContentOpened"
    @leave="setContentClosed"
    @after-leave="handleContentToggleEnd"
  >
    <slot />
  </transition>
</template>

<style lang="scss">
.collapse-enter-active,
.collapse-leave-active {
  transition: v-bind(duration) ease-in-out height;
  will-change: height;
  overflow: hidden;
}
</style>
