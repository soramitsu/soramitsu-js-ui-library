<template>
  <div
    class="s-input"
    :class="computedClasses"
  >
    <span v-if="value" class="placeholder">{{ placeholder }}</span>
    <el-input
      ref="el-input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :show-password="showPassword"
      :readonly="readonly"
      :show-word-limit="showTextLimit"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      :name="name"
      :max="max"
      :min="min"
      :form="form"
      :label="label"
      :tabindex="tabindex"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

import { Autocomplete, InputType } from './consts'
import { ElInput } from 'element-ui/types/input'

@Component
export default class SInput extends Vue {
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

  focused = false

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.focused) {
      cssClasses.push('focused')
    }
    if (this.disabled) {
      cssClasses.push('disabled')
    }
    return cssClasses
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
@import "~@/styles/variables.scss";

.s-input {
  font-family: $font-family-default;
  width: 100%;
  min-height: $size-big;
  position: relative;
  .placeholder {
    // TODO: ask about animation
    color: $color-neutral-secondary;
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
  .placeholder + .el-input > input {
    padding-top: 12px;
  }
  .placeholder + .el-textarea > textarea {
    padding-top: 24px;
  }
}

</style>
