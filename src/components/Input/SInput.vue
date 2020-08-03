<template>
  <div
    class="s-input"
    :class="computedClasses"
  >
    <span v-if="model" class="placeholder">{{ placeholder }}</span>
    <el-input
      ref="el-input"
      :type="computedType"
      :placeholder="placeholder"
      v-model="model"
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
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <template v-if="type === InputType.TEXT_FILE">
      <i class="s-icon-file"></i>
      <input :value="emptyValue" type="file" :accept="accept" @change="handleTextFileChange">
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Inject, Watch } from 'vue-property-decorator'
import { ElInput } from 'element-ui/types/input'
import { ElForm } from 'element-ui/types/form'

import { Autocomplete, InputType } from './consts'

@Component
export default class SInput extends Vue {
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

  @Ref('el-input') input!: ElInput

  @Inject({ default: '', from: 'elForm' }) elForm!: ElForm

  focused = false
  model = this.value

  @Watch('value')
  private handlePropChange (value: string | number): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string | number): void {
    this.$emit('input', value)
    this.$emit('change', value)
  }

  get isTextInput (): boolean {
    return this.type === InputType.TEXT
  }

  get isTextOrTextareaInput (): boolean {
    return [InputType.TEXT, InputType.TEXTAREA].includes(this.type as InputType)
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.focused) {
      cssClasses.push('focused')
    }
    if (this.disabled || (this.elForm || {}).disabled) {
      cssClasses.push('disabled')
    }
    if (this.type === InputType.TEXT_FILE) {
      cssClasses.push('text-file')
    }
    return cssClasses
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
      this.model = ((event.target || {}).result as string)
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

<style lang="scss">
@import "../../styles/variables.scss";

.s-input {
  font-family: $font-family-default;
  width: 100%;
  min-height: $size-big;
  position: relative;
  .el-input__suffix {
    z-index: 1;
  }
  .placeholder {
    // TODO: add default animation from material-ui
    color: $color-neutral-secondary;
    text-align: left;
    font-size: 12px;
    padding: 0 15px;
    padding-top: 5px;
    top: 1px;
    left: 1px;
    border-top-left-radius: 4px;
    position: absolute;
    z-index: 1;
    width: calc(100% - 15px);
    background-color: $color-neutral-placeholder;
    pointer-events: none;
  }
  .el-input,
  .el-textarea {
    height: 100%;
    > input,
    > textarea {
      height: $size-big;
      border: 1px solid $color-neutral-placeholder;
      background-color: $color-neutral-placeholder;
      &::placeholder {
        color: $color-neutral-secondary;
        opacity: 1; // Firefox
      }
    }
    > textarea {
      padding-top: 12px;
    }
    [class^="el-input__count"] {
      background-color: transparent;
    }
  }
  &:hover {
    .placeholder,
    .el-input > input,
    .el-textarea > textarea {
      background-color: $color-neutral-hover;
    }
    .el-input > input,
    .el-textarea > textarea {
      border-color: $color-neutral-hover;
    }
  }
  &.focused {
    .placeholder,
    .el-input > input,
    .el-textarea > textarea {
      background-color: $color-basic-white;
    }
    .el-input > input,
    .el-textarea > textarea {
      border-color: $color-neutral-border;
    }
  }
  &.disabled {
    .placeholder,
    .el-input > input,
    .el-textarea > textarea {
      color: $color-neutral-secondary;
      background-color: $color-neutral-placeholder;
    }
    .el-input > input,
    .el-textarea > textarea {
      border-color: $color-neutral-border;
    }
  }
  .placeholder + .el-input {
    > input {
      padding-top: 12px;
    }
    .el-input__validateIcon {
      padding-top: 11px;
    }
  }
  .placeholder + .el-textarea > textarea {
    padding-top: 24px;
  }
  &.text-file {
    .el-input > input {
      padding-right: 56px;
    }
    .s-icon-file {
      top: 16px;
      right: 16px;
      z-index: 1;
      + input {
        cursor: pointer;
        position: absolute;
        opacity: 0;
        top: 0;
        right: 0;
        width: 56px;
        height: 100%;
        z-index: 2;
      }
    }
  }
}

</style>
