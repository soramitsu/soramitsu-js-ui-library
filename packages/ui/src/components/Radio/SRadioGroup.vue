<script setup lang="ts">
import { RADIO_GROUP_API_KEY } from './api'
import { useRadiosSelector, useRadiosRegistration } from './util'

interface Props {
  modelValue?: null | symbol | string | number | object

  /**
   * @default '[role=radio]'
   */
  radioSelector?: string

  labelledBy?: string
  describedBy?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  radioSelector: '[role=radio]',
})

const emit = defineEmits(['update:modelValue'])

// API

const model = useVModel(props, 'modelValue', emit, { passive: true })

const { elems: radioElements, update: updateRadioElements } = useRadiosSelector<HTMLElement>(
  templateRef('root'),
  computed(() => props.radioSelector),
)

const { registerRadio, moveFocus, checkFocused } = useRadiosRegistration({
  radioElements,
  model,
  updateRadioElements,
})

provide(RADIO_GROUP_API_KEY, readonly({ registerRadio }))

// Handling keyboard

function handleKeydown(e: KeyboardEvent) {
  switch (e.code) {
    case 'ArrowDown':
    case 'ArrowRight':
      moveFocus(1)
      break

    case 'ArrowUp':
    case 'ArrowLeft':
      moveFocus(-1)
      break

    case 'Space':
      checkFocused()
      break
  }
}

// ETC

const aria = computed(() => {
  const attrs: Record<string, string> = {}

  if (props.labelledBy) {
    attrs['aria-labelledby'] = props.labelledBy
  }
  if (props.describedBy) {
    attrs['aria-describedby'] = props.describedBy
  }

  return attrs
})
</script>

<template>
  <div
    ref="root"
    role="radiogroup"
    v-bind="aria"
    @keydown="handleKeydown"
  >
    <slot v-bind="{ labelledBy }" />
  </div>
</template>
