<template>
  <div
    class="s-json-input"
    :class="computedClasses"
  >
    <v-jsoneditor
      ref="jsoneditor"
      v-model="model"
      :options="computedOptions"
      :plus="false"
      :height="computedHeight"
      @error="handleError"
    />
    <div
      class="s-json-input-stretch"
      @mousedown="handleStretchMousedown"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path d="M4.29 12.07l-.35-.35 7.78-7.78.35.35-7.78 7.78zm7.78-3.54l-.35-.35-3.54 3.54.35.35 3.54-3.54z"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import isEmpty from 'lodash/fp/isEmpty'

@Component
export default class SJsonInput extends Vue {
  /**
   * Value of JSON input. Could be used with `v-model`
   */
  @Prop({ type: Object }) readonly value!: object
  /**
   * Height of JSON input component. Minimum value should be around `"176px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ type: String, default: '' }) readonly height!: string
  /**
   * Options for v-jsoneditor.
   */
  @Prop({ type: Object, default: () => {} }) readonly options!: object
  /**
   * Disabled state.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Readonly state.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean
  /**
   * Autocomplete dictionary. For now it doesn't work for some reasons
   */
  @Prop({ type: Array }) readonly dictionary!: Array<string>

  @Ref('jsoneditor') jsoneditor!: any

  readonly minHeight = 176

  localHeight: number | null = null
  stretchStartHeight: number | null = null
  stretchStartMouseY: number | null = null
  model = this.value
  defultOptions = {
    // https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options
    mode: 'code',
    mainMenuBar: false,
    statusBar: true,
    autocomplete: {
      caseSensitive: false,
      getOptions: () => {
        return isEmpty(this.dictionary) ? null : this.dictionary
      }
    }
  }

  get computedHeight () {
    if (this.localHeight === null) {
      return this.height
    }
    return `${this.localHeight}px`
  }

  get computedOptions () {
    return {
      ...this.defultOptions,
      ...this.options
    }
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.disabled) {
      cssClasses.push('s-disabled')
    }
    if (this.readonly) {
      cssClasses.push('s-readonly')
    }
    return cssClasses
  }

  handleError (error: string): void {
    if (!this.readonly) {
      this.$emit('error', error)
      return
    }
    if (!this.jsoneditor) {
      return
    }
    this.jsoneditor.editor.set(this.value)
  }

  @Watch('value', { deep: true })
  private handlePropChange (value: object): void {
    this.model = value
  }

  @Watch('model', { deep: true })
  private handleValueChange (value: object): void {
    if (!this.readonly) {
      this.$emit('input', value)
      this.$emit('change', value)
      return
    }
    if (!this.jsoneditor) {
      return
    }
    this.jsoneditor.editor.set(this.value)
  }

  handleStretchMousedown () {
    this.stretchStartHeight = (this.$el as any).offsetHeight
    document.addEventListener('mousemove', this.handleStretchMousemove)
    document.addEventListener('mouseup', this.handleStretchMouseup)
  }

  handleStretchMousemove (event) {
    if (this.stretchStartMouseY === null) {
      this.stretchStartMouseY = event.clientY as number
    }
    this.localHeight = Math.max(this.stretchStartHeight + event.clientY - this.stretchStartMouseY, this.minHeight)
  }

  handleStretchMouseup () {
    document.removeEventListener('mousemove', this.handleStretchMousemove)
    document.removeEventListener('mouseup', this.handleStretchMouseup)
    this.stretchStartMouseY = null
  }
}
</script>
