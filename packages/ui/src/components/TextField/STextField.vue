<script lang="ts">
export default {
  inheritAttrs: false,
}

import type { StyleValue } from 'vue'
import { Status } from '@/types'
import type { MaybeElementRef } from '@vueuse/core'

/**
 * warning: don't use it inside of `Props`. Vue compiler determines it
 * as an object and generates wrong props definition
 */
type TextFieldStatus = Exclude<Status, typeof Status.Info>

interface Props {
  /**
   * Model value
   */
  modelValue?: string

  /**
   * "Strict sync" means that when `<input>` element's value is updated,
   * component's `modelValue` is updated **and then** input's value is set
   * by `modelValue`.
   *
   * This behavior disallows for `<input>` to have value that differs from
   * `modelValue`.
   *
   * Enable this prop to disable this behaviour.
   *
   * @default false
   */
  noModelValueStrictSync?: boolean

  /**
   * Will be used if `label` slot is omitted
   */
  label?: string

  /**
   * Recommended for a11y
   */
  id?: string

  /**
   * @default false
   */
  password?: boolean

  /**
   * Disable eye-toggle that is shown if input is `password`
   *
   * @default false
   */
  noEye?: boolean

  /**
   * @default false
   */
  disabled?: boolean

  /**
   * If this value is defined, then the counter will be shown.
   *
   * @remarks
   * Could not be less than 0. Render depends on the passed value type:
   *
   * - number | string - `{count}/{counter value}`
   * - boolean (true) - `{count}` (just a count)
   *
   * This value doesn't apply any validation - just renders a counter.
   *
   * @default false
   */
  counter?: boolean | number | string

  /**
   * Primary status prop. Overrides `success`, `warning` and `error` particular
   * setters.
   */
  status?: typeof Status.Success | typeof Status.Error | typeof Status.Warning
  /**
   * Shorthand for `success` status
   */
  success?: boolean
  /**
   * Shorthand for `warning` status
   */
  warning?: boolean
  /**
   * Shorthand for `error` status
   */
  error?: boolean
  /**
   * Text to display under the input.
   *
   * @remarks
   * If input has some status, text will be styled according to this
   * status and will be prefixed with a status icon.
   *
   * Also you can use `message` slot.
   */
  message?: string
  /**
   * Manually activates filled state
   */
  filledState?: boolean
}
</script>

<script setup lang="ts">
import { STATUS_ICONS_MAP_16, IconEye, IconEyeOff } from '../icons'

const props = withDefaults(defineProps<Props>(), {
  multiline: false,
  password: false,
  disabled: false,
  counter: false,
  noEye: false,
  noModelValueStrictSync: false,
  filledState: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'click:input-wrapper', value: MouseEvent): void
}>()

const slots = useSlots()

// ***

const status = computed<null | TextFieldStatus>(() => {
  if (props.status) return props.status
  if (props.success) return Status.Success
  if (props.warning) return Status.Warning
  if (props.error) return Status.Error
  return null
})

const model = useVModel(props, 'modelValue', emit)

function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  model.value = el.value
  if (!props.noModelValueStrictSync) {
    el.value = model.value ?? ''
  }
}

const isValueEmpty = computed(() => !model.value)
const isFocused = ref(false)
const labelTypographyClass = computed(() =>
  !(props.filledState || isFocused.value) && isValueEmpty.value ? 'sora-tpg-p3' : 'sora-tpg-p4',
)

const inputRef = ref<MaybeElementRef>(null)

function handleInputWrapperClick(event: MouseEvent) {
  if (event.target !== document.activeElement) {
    event.preventDefault()
  }

  if (inputRef.value instanceof HTMLInputElement && !isFocused.value) {
    inputRef.value.focus()
    isFocused.value = true
  }

  emit('click:input-wrapper', event)
}

function handleInputWrapperMouseDown(event: MouseEvent) {
  if (event.target === inputRef.value) return

  event.preventDefault()
}

// MESSAGE

const isMessageSlotDefined = () => !!slots.message
const shouldRenderMessage = () => !!props.message || isMessageSlotDefined()
const messageIcon = computed(() => {
  if (status.value === null) return null
  return STATUS_ICONS_MAP_16[status.value]
})

// COUNTER

interface CounterConfig {
  /**
   * Normalized limit, >= 0 for sure
   */
  limit: null | number
}

const counterConfig = computed<null | CounterConfig>(() => {
  const val = props.counter
  const ty = typeof val
  if (ty === 'boolean' && val) {
    return { limit: null }
  }
  if (ty === 'number' || ty === 'string') {
    const num = Number(val)
    return { limit: num >= 0 ? num : null }
  }
  return null
})

const counterText = computed<string | null>(() => {
  const config = counterConfig.value
  if (!config) return null
  const { limit } = config
  const currentCount = model.value?.length ?? 0
  return limit === null ? String(currentCount) : `${currentCount}/${limit}`
})

// attrs are not reactive: https://vuejs.org/api/composition-api-setup.html#setup-context
// so we need to compute them directly in the render function
const attrs = useAttrs()
const rootClass = () => attrs.class
const rootStyle = () => attrs.style as StyleValue
const inputAttrs = () => {
  const { style, class: clazz, ...rest } = attrs
  return rest
}

// APPEND

const showEye = computed<boolean>(() => props.password && !props.noEye)
const isAppendSlotDefined = () => !!slots.append
const shouldRenderAppend = () => !!counterText.value || isAppendSlotDefined() || showEye.value

// EYE

const [forceRevealPassword, toggleForceReveal] = useToggle()
const inputType = computed(() =>
  props.password && (!showEye.value || !forceRevealPassword.value) ? 'password' : 'text',
)
</script>

<template>
  <div
    :class="[
      's-text-field',
      {
        's-text-field_empty': isValueEmpty && !filledState,
        's-text-field_filled-state': filledState,
        's-text-field_disabled': disabled,
      },
      rootClass(),
    ]"
    :style="rootStyle()"
    :data-status="status"
  >
    <!-- key events works with input element -->
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
    <div
      class="s-text-field__input-wrapper"
      @click="handleInputWrapperClick"
      @mousedown="handleInputWrapperMouseDown"
    >
      <label
        :for="id"
        :class="labelTypographyClass"
      >
        <slot name="label">{{ label }}</slot>
      </label>

      <div class="s-text-field__input-line">
        <slot name="prefix" />

        <input
          :id="id"
          ref="inputRef"
          class="sora-tpg-p3"
          :value="model"
          :type="inputType"
          :disabled="disabled"
          v-bind="inputAttrs()"
          @input="onInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
      </div>

      <div
        v-if="shouldRenderAppend()"
        class="s-text-field__append"
        data-testid="append"
      >
        <div
          v-if="counterText"
          data-testid="counter"
          class="s-text-field__counter sora-tpg-p4"
        >
          {{ counterText }}
        </div>

        <slot name="append" />

        <button
          v-if="showEye"
          class="s-text-field__eye"
          data-testid="eye"
          type="button"
          @click.stop="toggleForceReveal()"
        >
          <IconEye v-if="!forceRevealPassword" />
          <IconEyeOff v-else />
        </button>
      </div>
    </div>

    <Transition name="s-text-field__message-transition">
      <div
        v-if="shouldRenderMessage()"
        data-testid="message"
        class="s-text-field__message sora-tpg-p4"
      >
        <component
          :is="messageIcon"
          v-if="messageIcon"
          class="s-text-field__message-icon"
        />

        <span>
          <slot name="message">{{ message }}</slot>
        </span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use '@/theme';

$height: 56px;
$input-padding: 24px 16px 6px 16px;
$label-top-primary: 16px;
$label-top-secondary: 6px;
$message-icon-alignment-fix: -1px;

$theme-bg: theme.token-as-var('sys.color.background');
$theme-bg-hover: theme.token-as-var('sys.color.background-hover');
$theme-border-primary: theme.token-as-var('sys.color.border-primary');
$theme-content-tertiary: theme.token-as-var('sys.color.content-tertiary');

.s-text-field {
  $root: &;

  &_disabled &__input-wrapper {
    @apply pointer-events-none opacity-75;
    // todo
  }

  &:not(&_empty),
  &_filled-state,
  &:focus-within {
    label {
      transform: translateY(#{$label-top-secondary});
      // @apply s-ty-p4;
    }
  }

  &__input-wrapper {
    background: $theme-bg;
    @apply rounded border border-transparent;
    @apply relative flex;
    @apply transition-all;

    min-height: $height;

    &:hover:not(:focus-within) {
      background: $theme-bg-hover;
    }

    &:focus-within {
      border-color: $theme-border-primary;
      @apply bg-transparent;
    }

    label {
      color: $theme-content-tertiary;
      @apply pointer-events-none;
      @apply absolute top-0 left-4;
      @apply transition-all;

      // primary state by default
      transform: translateY(#{$label-top-primary});
    }
  }

  &__input-line {
    @apply flex flex-wrap flex-grow min-w-0;
    padding: $input-padding;

    input {
      @apply flex-1 w-full min-w-1/4;

      background: transparent;
      &:focus {
        outline: none;
      }
    }
  }

  &__append {
    @apply flex items-center space-x-4 pr-4;
  }

  &__counter {
    color: $theme-content-tertiary;
  }

  @each $status in 'success', 'warning', 'error' {
    $col: theme.token-as-var('sys.color.status.#{$status}');
    $bg: theme.token-as-var('sys.color.status.#{$status}-background');
    $bg-hover: theme.token-as-var('sys.color.status.#{$status}-background-hover');

    &[data-status='#{$status}'] {
      label {
        color: $col;
      }

      #{$root}__input-wrapper {
        background: $bg;
        border: {
          color: $col;
        }

        &:hover:not(:focus-within) {
          background: $bg-hover;
        }

        &:focus-within {
          background: transparent;
        }
      }

      #{$root}__message-icon {
        color: $col;
      }
    }
  }

  &__message {
    @apply pt-2;

    svg#{&}-icon {
      fill: currentColor;
      @apply inline-block mr-1 relative;
      top: $message-icon-alignment-fix;
    }

    &-transition {
      &-enter-active,
      &-leave-active {
        @apply transition-all;
      }

      &-enter-from,
      &-leave-to {
        transform: translateY(-8px);
        opacity: 0;
      }
    }
  }

  &__eye {
    cursor: pointer;
    position: relative;

    // icon size
    // approximately, not strict by design system
    // FIXME
    font-size: 18px;

    &:active svg {
      transform: scale(0.9);
    }
  }
}
</style>
