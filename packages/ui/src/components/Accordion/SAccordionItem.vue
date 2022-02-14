<script lang="ts">
export default { name: 'SAccordionItem' }
</script>

<script setup lang="ts">
import { onUnmounted, computed } from 'vue'
import { IconArrowsChevronDownRounded24 } from '@/components/icons'
import { useIncrementalId } from '@/composables/incremental-id'
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

const contentId = 'accordion-item-content-' + useIncrementalId()

function toggle(expand?: boolean) {
  model.value = expand ?? !model.value
}

function setContentClosed(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = '0'
  }
}

function setContentOpened(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = el.scrollHeight + "px"
  }
}

function handleContentToggleEnd(el: Element) {
  if (el instanceof HTMLElement) {
    el.style.height = ""
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
    data-testid="accordion-item"
  >
    <button
      class="s-accordion-item__trigger"
      data-testid="trigger"
      :aria-expanded="model"
      :aria-controls="contentId"
      @click="handleTriggerClick"
    >
      <div class="s-accordion-item__head">
        <div class="sora-tpg-p2">
          <template v-if="title">
            {{ title }}
          </template>
          <slot
            v-else
            name="title"
          />
        </div>
        <div class="s-accordion-item__subtitle sora-tpg-p4">
          <template v-if="subtitle">
            {{ subtitle }}
          </template>
          <slot
            v-else
            name="subtitle"
          />
        </div>
      </div>
      <IconArrowsChevronDownRounded24
        class="s-accordion-item__chevron"
        aria-hidden="true"
      />
    </button>

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
        :id="contentId"
        class="s-accordion-item__body-wrapper"
        data-testid="content"
      >
        <div class="s-accordion-item__body">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@use '@/theme';

.s-accordion-item {
  @apply flex flex-col;
  border: 1px solid theme.token-as-var('sys.color.border-secondary');
  $component: &;

  &_expanded {
    #{$component}__chevron {
      transform: rotate(180deg);
    }

    #{$component}__trigger {
      background-color: theme.token-as-var('sys.color.background');
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
    @apply h-64px px-24px flex items-center cursor-pointer text-left;
  }

  &__head {
    @apply flex-grow flex flex-col justify-center;
  }

  &__subtitle {
    color: theme.token-as-var('sys.color.content-tertiary');
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
