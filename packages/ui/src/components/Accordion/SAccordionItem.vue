<script lang="ts">
export default { name: 'SAccordionItem' }
</script>

<script setup lang="ts">
import { onUnmounted, computed } from 'vue'
import { IconArrowsChevronDownRounded24 } from '@/components/icons'
import { useAccordionApi } from './api'

const props = withDefaults(
    defineProps<{
      modelValue?: boolean,
      title?: string,
      subtitle?: string,
      name?: string,
    }>(),
    {
      modelValue: false,
      title: '',
      subtitle: '',
      name: '',
    },
)

const emit = defineEmits<(event: 'update:modelValue', value: boolean) => void>()
const model = useVModel(props, 'modelValue', emit, { passive: true })


function toggle(expand?: boolean) {
  model.value = expand ?? !model.value
}

function setContentClosed(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = '0';
  }
}

function setContentOpened(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = el.scrollHeight + "px";
  }
}

function handleContentToggleEnd(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = "";
  }
}

function handleTriggerClick() {
  toggle()
}

const groupApi = useAccordionApi()

if (groupApi) {
  const { register, unregister } = groupApi

  const api = computed(() => ({
    name: props.name,
    isActive: model.value,
    toggle
  }))

  register(api)

  onUnmounted(() => {
    unregister(api)
  })
}
</script>

<template>
  <div
    class="s-accordion-item"
    :class="{
      's-accordion-item_expanded': model
    }"
  >
    <div
      class="s-accordion-item__trigger"
      @click="handleTriggerClick"
    >
      <div class="s-accordion-item__head">
        <div class="s-accordion-item__title">
          <template v-if="title">
            {{ title }}
          </template>
          <slot
            v-else
            name="title"
          />
        </div>
        <div class="s-accordion-item__subtitle">
          <template v-if="subtitle">
            {{ subtitle }}
          </template>
          <slot
            v-else
            name="subtitle"
          />
        </div>
      </div>
      <IconArrowsChevronDownRounded24 class="s-accordion-item__chevron" />
    </div>

    <transition
      name="accordion"
      @before-enter="setContentClosed"
      @enter="setContentOpened"
      @after-enter="handleContentToggleEnd"
      @before-leave="setContentOpened"
      @leave="setContentClosed"
      @after-leave="handleContentToggleEnd"
    >
      <div
        v-show="model"
        class="s-accordion-item__body-wrapper"
      >
        <div class="s-accordion-item__body">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.s-accordion-item {
  @apply flex flex-col border border-base-border-secondary;
  $component: &;

  &_expanded {
    @apply border-base-border-primary;

    #{$component}__chevron {
      transform: rotate(180deg);
    }

    #{$component}__trigger {
      @apply bg-base-background;
    }

    #{$component}__body-wrapper {
      box-shadow: 0 6px 4px -4px rgba(83, 86, 90, 0.15) inset;
    }
  }

  &__chevron {
    @apply ml-16px;
    transition: 250ms ease-in-out transform;
  }

  &__trigger {
    transition: 250ms ease-in-out background-color;
    @apply h-64px px-24px flex items-center cursor-pointer;
  }

  &__head {
    @apply flex-grow flex flex-col justify-center;
  }

  &__titile {
    @apply s-ty-p2;
  }

  &__subtitle {
    @apply s-ty-p4 text-base-content-tertiary;
  }

  &__body {
    @apply p-24px;
  }

  .accordion-enter-active, .accordion-leave-active {
    transition: 250ms ease-in-out height;
    will-change: height;
    overflow: hidden;
  }
}
</style>
