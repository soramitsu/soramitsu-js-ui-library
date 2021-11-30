<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'STextField',
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { Status } from '@/types'
import { STATUS_ICONS_MAP_16, IconBasicEye24, IconBasicEyeNo24 } from '../icons'

/**
 * warning: don't use it inside of `Props`. Vue compiler determines it
 * as an object and generates wrong props definition
 */
type TextFieldStatus = Exclude<Status, Status.Info>

interface Props {
  /**
   * Passive model value.
   */
  modelValue?: string

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
   * Could not be <= 0. Render depends on the passed value type:
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
  status?: Status.Success | Status.Error | Status.Warning
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
}

const props = withDefaults(defineProps<Props>(), {
  multiline: false,
  password: false,
  disabled: false,
  counter: false,
  noEye: false,
})

const emit = defineEmits<(event: 'update:modelValue', value: string) => void>()

const slots = useSlots()

// ***

const status = computed<null | TextFieldStatus>(() => {
  if (props.status) return props.status
  if (props.success) return Status.Success
  if (props.warning) return Status.Warning
  if (props.error) return Status.Error
  return null
})

const model = useVModel(props, 'modelValue', emit, { passive: true })

const isValueEmpty = computed(() => !model.value)

// MESSAGE

// watchEffect(() => {
//   console.log('reactive? %o\nkeys: %o', isReactive(slots), Object.keys(slots))
// })

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
        's-text-field--empty': isValueEmpty,
        's-text-field--disabled': disabled,
      },
    ]"
    :data-status="status"
  >
    <div class="s-text-field__input-wrapper">
      <label :for="id">
        <slot name="label">{{ label }}</slot>
      </label>

      <input
        :id="id"
        v-model="model"
        :type="inputType"
        :disabled="disabled"
        v-bind="$attrs"
      >

      <div
        v-if="shouldRenderAppend()"
        class="s-text-field__append"
        data-testid="append"
      >
        <div
          v-if="counterText"
          data-testid="counter"
          class="s-text-field__counter"
        >
          {{ counterText }}
        </div>

        <slot name="append" />

        <button
          v-if="showEye"
          class="s-text-field__eye"
          data-testid="eye"
          @click="toggleForceReveal()"
        >
          <Transition name="s-text-field__eye-transition">
            <IconBasicEye24 v-if="!forceRevealPassword" />
            <IconBasicEyeNo24 v-else />
          </Transition>
        </button>
      </div>
    </div>

    <Transition name="s-text-field__message-transition">
      <div
        v-if="shouldRenderMessage()"
        data-testid="message"
        class="s-text-field__message"
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
$height: 56px;
$input-padding: 24px 16px 6px 16px;
$label-top-primary: 16px;
$label-top-secondary: 6px;
$message-icon-alignment-fix: -1px;

@function status-color($status) {
  @return var(--s-color-status-#{$status});
}

@function status-color-bg($status) {
  @return var(--s-color-status-#{$status}-background);
}

.s-text-field {
  $root: &;

  &--disabled &__input-wrapper {
    @apply pointer-events-none opacity-75;
    // todo
  }

  &:not(&--empty),
  &:focus-within {
    label {
      transform: translateY(#{$label-top-secondary});
      @apply s-ty-p4;
    }
  }

  &__input-wrapper {
    @apply bg-base-background rounded border border-transparent;
    @apply relative flex;
    @apply transition-all;

    height: $height;

    &:hover:not(:focus-within) {
      @apply bg-base-background-hover;
    }

    &:focus-within {
      @apply border-base-border-primary bg-transparent;
    }

    label {
      @apply s-ty-p3 text-base-content-tertiary pointer-events-none;
      @apply absolute top-0 left-4;
      @apply transition-all;

      // primary state by default
      transform: translateY(#{$label-top-primary});
    }

    input {
      @apply h-full flex-1;
      padding: $input-padding;

      background: transparent;
      &:focus {
        outline: none;
      }
    }
  }

  &__append {
    @apply h-full flex items-center space-x-4 pr-4;
  }

  &__counter {
    @apply text-base-content-tertiary s-ty-p4;
  }

  @each $status in 'success', 'warning', 'error' {
    $col: status-color($status);
    $bg: status-color-bg($status);

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
          // FIXME
          // need special status-hover color
          background: transparent;
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
    @apply s-ty-p4 pt-2;

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

    &-transition {
      &-leave-active,
      &-enter-active {
        @apply transition-transform;
      }

      &-leave-active {
        position: absolute;
      }

      &-enter-from,
      &-leave-to {
        // FIXME scale transition twitching a bit
        @apply transform scale-0;
      }
    }
  }
}
</style>
