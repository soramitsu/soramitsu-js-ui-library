<template>
  <div
    class="s-input"
    :class="computedClasses"
  >
    <span v-if="value && !isMediumInput" class="s-placeholder">{{ placeholder }}</span>
    <el-input
      ref="el-input"
      :value="value"
      :type="computedType"
      :placeholder="placeholder"
      :disabled="disabled"
      :show-password="showPassword && isTextInput"
      :readonly="readonly"
      :show-word-limit="showTextLimit && isTextOrTextareaInput"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :name="name"
      :max="max"
      :min="min"
      :form="form"
      :label="label"
      :accept="accept"
      :tabindex="tabindex"
      :prefix-icon="(isMediumInput && prefix) ? prefix : ''"
      :suffix-icon="suffix"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @paste.native="handlePaste"
    />
    <template v-if="type === InputType.TEXT_FILE">
      <i class="s-icon-file-upload"></i>
      <input :value="emptyValue" type="file" :accept="accept" @change="handleTextFileChange">
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Ref, Inject } from 'vue-property-decorator'
import { ElInput } from 'element-ui/types/input'
import { ElForm } from 'element-ui/types/form'

import BorderRadiusMixin from '../../mixins/BorderRadiusMixin'
import { Autocomplete, InputSize, InputType } from './consts'

@Component
export default class SInput extends Mixins(BorderRadiusMixin) {
  readonly InputType = InputType
  readonly emptyValue = null
  /**
   * Type of input. It can be "text" or "textarea" or any native input type.
   * `"text"` by default
   */
  @Prop({ default: InputType.TEXT, type: String }) readonly type!: string
  /**
   * Placeholder of input
   */
  @Prop({ default: '', type: String }) readonly placeholder!: string
  /**
   * Value of input
   */
  @Prop({ default: '' }) readonly value!: string | number
  /**
   * Disable state
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Show password flag. `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly showPassword!: boolean
  /**
   * Readonly flag of native input. `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly readonly!: boolean
  /**
   * If this flag is enabled then user will see input limitation. `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly showTextLimit!: boolean
  /**
   * Accept property for `"file"` or `"text-file"` input type
   */
  @Prop({ default: '', type: String }) readonly accept!: string
  /**
   * Maxlength property of native input
   */
  @Prop() readonly maxlength: number | undefined
  /**
   * Minlength property of native input
   */
  @Prop() readonly minlength: number | undefined
  /**
   * Autocomplete property of native input. `"off"` by default
   */
  @Prop({ default: Autocomplete.OFF, type: String }) readonly autocomplete!: Autocomplete
  /**
   * Name property of native input
   */
  @Prop({ default: '', type: String }) readonly name!: string
  /**
   * Max property of native input
   */
  @Prop() readonly max: number | undefined
  /**
   * Min property of native input
   */
  @Prop() readonly min: number | undefined
  /**
   * Form property of native input
   */
  @Prop({ default: '', type: String }) readonly form!: string
  /**
   * Label text
   */
  @Prop({ default: '', type: String }) readonly label!: string
  /**
   * Input tabindex
   */
  @Prop({ default: '', type: String }) readonly tabindex!: string
  /**
   * Icon prefix, works only with medium input
   */
  @Prop({ default: '', type: String }) readonly prefix!: string
  /**
   * Icon suffix
   */
  @Prop({ default: '', type: String }) readonly suffix!: string
  /**
   * Field size, "big" by default
   */
  @Prop({ default: InputSize.BIG, type: String }) readonly size!: InputSize

  @Ref('el-input') input!: ElInput

  @Inject({ default: '', from: 'elForm' }) elForm!: ElForm

  focused = false
  autofill = false

  mounted (): void {
    this.$el.addEventListener('animationstart', this.changeAutofillValue)
  }

  destroyed (): void {
    this.$el.removeEventListener('animationstart', this.changeAutofillValue)
  }

  private changeAutofillValue (e: any): void {
    this.autofill = e.animationName === 'onAutoFillStart'
  }

  get isTextInput (): boolean {
    return this.type === InputType.TEXT
  }

  get isTextOrTextareaInput (): boolean {
    return [InputType.TEXT, InputType.TEXTAREA].includes(this.type as InputType)
  }

  get isMediumInput (): boolean {
    return this.type === InputType.TEXT && this.size === InputSize.MEDIUM
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.focused) {
      cssClasses.push('s-focused')
    }
    if (this.disabled || (this.elForm || {}).disabled) {
      cssClasses.push('s-disabled')
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if (this.type === InputType.TEXT_FILE) {
      cssClasses.push('s-text-file')
    }
    if (this.autofill) {
      cssClasses.push('s-autofill')
    }
    if (this.size) {
      cssClasses.push(this.sizeClass)
    }
    return cssClasses
  }

  get sizeClass (): string {
    switch (this.size) {
      case InputSize.MEDIUM:
        return 's-size-medium'
      case InputSize.BIG:
      default:
        return ''
    }
  }

  get computedType (): string {
    if (this.type === InputType.TEXT_FILE) {
      return InputType.TEXT
    }
    return this.type
  }

  handleInput (value: string | number): void {
    this.$emit('input', value)
  }

  handleChange (value: string | number): void {
    this.$emit('change', value)
  }

  handlePaste (event: ClipboardEvent): void {
    if (!event || !event.clipboardData) return

    const value = event.clipboardData.getData('text')
    this.$emit('paste', value)
  }

  handleBlur (event: Event): void {
    this.focused = false
    this.$emit('blur', event)
  }

  handleFocus (event: Event): void {
    this.focused = true
    this.$emit('focus', event)
  }

  handleTextFileChange (event: any): void {
    if (typeof window.FileReader !== 'function') {
      throw new Error('The file API isn\'t supported on this browser.')
    }
    const input = event.target
    if (!input) {
      throw new Error('The browser does not properly implement the event object')
    }
    if (!input.files) {
      throw new Error('This browser does not support the `files` property of the file input.')
    }
    if (!input.files[0]) {
      return
    }
    const file = input.files[0]
    const fr = new FileReader()
    fr.onload = (event: ProgressEvent<FileReader>) => {
      const result = (event.target || {}).result as string
      this.handleInput(result)
      this.handleChange(result)
    }
    fr.readAsText(file)
  }

  public focus (): void {
    this.input.focus()
  }

  public blur (): void {
    this.input.blur()
  }

  public select (): void {
    this.input.select()
  }
}
</script>
