<script setup lang="ts">
import {
  defineProps,
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  defineEmit,
  nextTick,
  watch,
} from 'vue'
import type { PropType } from 'vue'
import JSONEditor from 'jsoneditor'
import type { JSONEditorOptions } from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
import isEmpty from 'lodash/fp/isEmpty'

const emit = defineEmit(['input', 'error'])

const props = defineProps({
  value: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Object as PropType<JSONEditorOptions>,
    default: () => ({}),
  },
  height: {
    type: String,
    default: '',
  },
  dictionary: {
    type: Array as PropType<Array<string>>,
    default: () => ([]),
  },
})

const minHeight = 178

const editor = ref<JSONEditor | null>(null)
const aceEditor = ref<Record<string, any> | null>(null)
const internalChange = ref(false)
const localHeight = ref<number | null>(null)
const stretchStartHeight = ref<number | null>(null)
const stretchStartMouseY = ref<number | null>(null)

const jsoneditor = ref<HTMLElement | null>(null)

onMounted(initView)
onBeforeUnmount(destroyView)
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleStretchMousemove)
  document.removeEventListener('mouseup', handleStretchMouseup)
})

const defaultOptions = computed<JSONEditorOptions>(() => ({
  // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
  mode: 'code',
  mainMenuBar: false,
  statusBar: true,
  autocomplete: {
    caseSensitive: false,
    getOptions: () => {
      return isEmpty(props.dictionary) ? null : props.dictionary
    },
  },
}))

const computedOptions = computed(() => ({
  ...defaultOptions.value,
  ...props.options,
}))

const computedHeight = computed(() => {
  if (localHeight.value === null)
    return props.height
  return `${localHeight.value}px`
})

function handleStretchMousedown() {
  if (!jsoneditor.value) throw new Error('jsoneditor is missing')
  stretchStartHeight.value = jsoneditor.value.offsetHeight
  document.addEventListener('mousemove', handleStretchMousemove)
  document.addEventListener('mouseup', handleStretchMouseup)
}

function handleStretchMousemove(event: MouseEvent) {
  if (stretchStartHeight.value === null) throw new Error('stretchStartHeight is null')
  if (stretchStartMouseY.value === null) stretchStartMouseY.value = event.clientY as number
  localHeight.value = Math.max(stretchStartHeight.value + event.clientY - stretchStartMouseY.value, minHeight)
}

function handleStretchMouseup() {
  document.removeEventListener('mousemove', handleStretchMousemove)
  document.removeEventListener('mouseup', handleStretchMouseup)
  stretchStartMouseY.value = null
}

watch(computedHeight, () => {
  if (!aceEditor.value) throw new Error('jsoneditor is missing')
  aceEditor.value.resize()
})

function onChange(...args: any) {
  let error = null
  let json = {}
  try { json = (editor.value as any).get() }
  catch (err) { error = err }
  if (error) { emit('error', error) }
  else {
    if (editor.value) {
      internalChange.value = true
      emit('input', json)
      nextTick(() => {
        internalChange.value = false
      })
    }
  }
}

function initView() {
  if (!editor.value) {
    if (!jsoneditor.value) throw new Error('jsoneditor is missing')
    // eslint-disable-next-line no-console
    const editorOptions = {
      ...computedOptions.value,
      onChange,
    }
    editor.value = new JSONEditor(jsoneditor.value, editorOptions)
  }
  editor.value.set(props.value !== undefined ? props.value : {})
  aceEditor.value = (editor.value as any).aceEditor
}

function destroyView() {
  if (editor.value) {
    editor.value.destroy()
    editor.value = null
  }
}

watch(() => props.value, () => {
  if (editor.value && props.value !== undefined && !internalChange.value) editor.value.set(props.value)
}, { deep: true })

watch(() => props.options, () => {
  if (!editor.value) throw new Error('editor is null')
  if (props.options && props.options.mode && editor) editor.value.setMode(props.options.mode)
}, { deep: true })
</script>

<template>
  <div
    class="s-json-input"
    :style="{ height: computedHeight }"
  >
    <div
      ref="jsoneditor"
      class="s-json-input__editor"
    />
    <div
      class="s-json-input__stretch"
      @mousedown="handleStretchMousedown"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path d="M4.29 12.07l-.35-.35 7.78-7.78.35.35-7.78 7.78zm7.78-3.54l-.35-.35-3.54 3.54.35.35 3.54-3.54z" />
      </svg>
    </div>
  </div>
</template>

<style lang="sass" scoped>
$footer-height: 26px

.s-json-input
  position: relative
  min-width: 300px
  width: 100%
  border: 1px solid var(--s-color-base-border-primary)
  border-radius: var(--s-border-radius-mini)

  &__editor
    height: 100%

  &__stretch
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    height: $footer-height
    width: $footer-height
    bottom: 0
    right: 0
    cursor: ns-resize
</style>

<style lang="sass">
@import '../../styles/variables.scss'

$color-ide-variable: #0451A5
$color-ide-string: #A31515
$color-ide-number: #098658
$color-ide-boolean: #0000FF

$footer-height: 26px

.s-json-input__editor
  .jsoneditor
    border: none !important
    font-family: $s-font-family-mono

  .jsoneditor-outer
    height: calc(100% - #{$footer-height})
    margin-bottom: -1px !important
    padding-bottom: 1px !important

  .ace-jsoneditor
    *, textarea.jsoneditor-text *
      font-family: $s-font-family-mono

    .ace_fold
      border: none
      background: none
      color: var(--s-color-base-content-primary)
      margin-top: -13px

    .ace_text-layer
      color: var(--s-color-base-content-primary)

    .ace_variable
      color: $color-ide-variable

    .ace_string
      color: $color-ide-string

    .ace_constant
      &.ace_numeric
        color: $color-ide-number

      &.ace_language
        color: $color-ide-boolean

    &.ace_editor
      border-top-left-radius: 3px
      border-top-right-radius: 3px

      .ace_marker-layer
        .ace_active-line
          background-color: var(--s-color-base-background)

        .ace_selection
          background: var(--s-color-base-background-hover)

  .jsoneditor-statusbar
    border-bottom-left-radius: 3px
    border-bottom-right-radius: 3px
    background-color: var(--s-color-base-background)
    color: var(--s-color-base-content-tertiary)

    .jsoneditor-parse-error-icon
      // If full error message will be needed, then it should be removed
      display: none !important
      pointer-events: none

  .ace_gutter
    background-color: var(--s-color-base-background)
    color: var(--s-color-base-content-primary)

    &-active-line
      background-color: var(--s-color-base-background-hover)

  .ace_editor .ace_content,
  .ace_gutter .ace_gutter-cell
    font-family: $s-font-family-mono

  .ace_tooltip
    font-family: $s-font-family-default
    background: var(--s-color-base-content-primary)
    border-color: var(--s-color-base-content-primary)
    color: var(--s-color-base-on-accent)
    border-radius: var(--s-border-radius-mini)
    padding: 10px
    font-size: var(--s-font-size-mini)
    line-height: 1.2
</style>
