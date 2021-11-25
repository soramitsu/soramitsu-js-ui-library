<script setup lang="ts">
import { Ref } from 'vue'
import { normalizeTransitionAttrs, useCloseOnEsc, useModalVisibility } from './util'
import { ModalApi, MODAL_API_KEY } from './api'
import { useFocusTrap } from '@/composables/focus-trap'
import { FocusTrap, Options as FocusTrapOptions } from 'focus-trap'
import { BodyScrollOptions } from 'body-scroll-lock'
import { useBodyScrollLock } from '@/composables/body-scroll-lock'

type ClassType = object | string | string[]
type StyleType = object

interface Props {
  /**
   * Use it as `v-model:show`
   */
  show: boolean

  /**
   * CSS-Selector. The Teleport target. Set `null` to render in-place.
   *
   * @default 'body'
   */
  teleportTo?: string

  /**
   * Whether position the modal as `absolute` instead of `fixed`
   * @default false
   */
  absolute?: boolean

  rootClass?: ClassType
  modalClass?: ClassType
  overlayClass?: ClassType
  rootStyle?: StyleType
  modalStyle?: StyleType
  overlayStyle?: StyleType

  /**
   * Name or raw bindings. You can even pass event listeners to the Transition component.
   */
  modalTransition?: string | object

  /**
   * @see `modalTransition` prop
   */
  overlayTransition?: string | object

  /**
   * You can pass some custom options here. Pass `false` to disable.
   *
   * note: it is not reactive
   *
   * @default true
   */
  lockScroll?: boolean | BodyScrollOptions

  /**
   * Set to `false` to not show overlay at all
   *
   * @default true
   */
  showOverlay?: boolean

  /**
   * @default true
   */
  closeOnOverlayClick?: boolean

  /**
   * @default true
   */
  closeOnEsc?: boolean

  /**
   * You can pass options to focus trap constructor or disable trap completely by passing `false`
   *
   * Note: that this prop is applied only on setup and is not reactive.
   *
   * @default true
   */
  focusTrap?: boolean | FocusTrapOptions

  /**
   * Always render modal content and toggle modal visibility with `v-show` instead of `v-if`
   *
   * @default false
   */
  eager?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  teleportTo: 'body',
  modalTransition: 's-modal__modal-transition',
  overlayTransition: 's-modal__overlay-transition',
  closeOnOverlayClick: true,
  closeOnEsc: true,
  showOverlay: true,
  lockScroll: true,
  focusTrap: true,
  eager: false,
})

interface Emits {
  (event: 'update:show', value: boolean): void
  (event: 'click:overlay' | 'before-open' | 'after-open' | 'before-close' | 'after-close'): void
}

const emit = defineEmits<Emits>()

// ***

const showModel = useVModel(props, 'show', emit)
const eager = computed(() => props.eager)
const showOverlay = computed(() => props.showOverlay)

function close() {
  showModel.value = false
}

// FOCUS TRAP

const modalRef = templateRef('modal')
let focusTrap: null | Ref<null | FocusTrap> = null
if (props.focusTrap) {
  const options: FocusTrapOptions = props.focusTrap === true ? {} : props.focusTrap
  ;({ trap: focusTrap } = useFocusTrap({
    elem: modalRef,
    options,
  }))

  watch(
    focusTrap,
    (trap) => {
      trap?.activate()
    },
    { immediate: true },
  )
}

// BODY SCROLL LOCK

if (props.lockScroll) {
  const opts: BodyScrollOptions = props.lockScroll === true ? {} : props.lockScroll
  useBodyScrollLock(modalRef, opts)
}

// API

const api: ModalApi = readonly({
  close,
  focusTrap,
})
provide(MODAL_API_KEY, api)

// ETC

const overlayTransitionAttrs = computed(() => normalizeTransitionAttrs(props.overlayTransition))
const modalTransitionAttrs = computed(() => normalizeTransitionAttrs(props.modalTransition))

const {
  rootIf,
  rootShow,
  modalIf,
  modalShow,
  overlayIf,
  overlayTransitionListeners,
  modalTransitionListeners,
  modalTransitionAppear,
} = useModalVisibility({
  show: showModel,
  overlayEnabled: showOverlay,
  eager,
  emit,
})

function onOverlayClick() {
  emit('click:overlay')
  if (props.closeOnOverlayClick) {
    showModel.value = false
  }
}

useCloseOnEsc(
  computed(() => showModel.value && props.closeOnEsc),
  close,
)
</script>

<template>
  <Teleport
    :to="teleportTo"
    :disabled="teleportTo === null"
  >
    <div
      v-if="rootIf"
      v-show="rootShow"
      :class="['s-modal__root', rootClass]"
      :style="rootStyle"
      :data-absolute="absolute"
      data-testid="root"
    >
      <Transition
        appear
        v-bind="overlayTransitionAttrs"
        v-on="overlayTransitionListeners"
      >
        <div
          v-if="overlayIf"
          :class="['s-modal__overlay', overlayClass]"
          :style="overlayStyle"
          data-testid="overlay"
          @click="onOverlayClick"
        />
      </Transition>

      <Transition
        :appear="modalTransitionAppear"
        v-bind="modalTransitionAttrs"
        v-on="modalTransitionListeners"
      >
        <div
          v-if="modalIf"
          v-show="modalShow"
          ref="modal"
          :style="modalStyle"
          :class="['s-modal__modal', modalClass]"
          aria-modal="true"
          role="dialog"
          data-testid="modal"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style lang="scss">
.s-modal {
  &__modal-transition {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: scale(0.5);
    }
  }

  &__overlay-transition {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }

  &__root {
    &[data-absolute='true'] {
      @apply absolute;
    }
    &:not([data-absolute='true']) {
      @apply fixed;
    }

    @apply inset-0 flex items-center justify-center;
    @apply z-999;
  }

  &__overlay {
    @apply z-999;
    @apply absolute inset-0 bg-utility-overlay;
  }

  &__modal {
    @apply z-1000;
  }
}
</style>
