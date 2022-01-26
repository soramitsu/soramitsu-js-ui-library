<script lang="ts">
export default { name: 'SAccordionItem' }
</script>

<script setup lang="ts">
import { IconArrowsChevronDownRounded24 } from '@/components/icons'

const props = withDefaults(
    defineProps<{
      modelValue?: boolean,
      title?: string,
      subtitle?: string,
    }>(),
    {
      modelValue: false,
      title: '',
      subtitle: '',
    },
)

const emit = defineEmits<(event: 'update:modelValue', value: string) => void>()
const model = useVModel(props, 'modelValue', emit, { passive: true })

function setContentClosed(el: HTMLElement) {
  el.style.height = '0';
}

function setContentOpened(el: HTMLElement) {
  el.style.height = el.scrollHeight + "px";
}

function handleContentToggleEnd(el: HTMLElement) {
  el.style.height = "";
}

function handleTriggerClick() {
  model.value = !model.value
}
</script>

<template>
  <div
    class="s-accordion"
    :class="{
      's-accordion_expanded': modelValue
    }"
  >
    <div
      class="s-accordion__trigger"
      @click="handleTriggerClick"
    >
      <div class="s-accordion__head">
        <div class="s-accordion__title">
          <template v-if="title">
            {{ title }}
          </template>
          <slot
            v-else
            name="title"
          />
        </div>
        <div class="s-accordion__subtitle">
          <template v-if="subtitle">
            {{ subtitle }}
          </template>
          <slot
            v-else
            name="subtitle"
          />
        </div>
      </div>
      <IconArrowsChevronDownRounded24 class="s-accordion__chevron" />
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
      <div v-show="model">
        <div class="s-accordion__body">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.s-accordion {
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
