<template>
  <div class="s-select" :class="computedClasses">
    <span v-if="willPlaceholderBeShown" class="placeholder">{{ placeholder }}</span>
    <el-select
      ref="select"
      v-model="model"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :multiple="multiple"
      :loading-text="loadingText"
      :clearable="clearable"
      :multiple-limit="multipleLimit"
      :no-data-text="noDataText"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      @visible-change="handleVisibleChange"
      @clear="handleClear"
    >
      <slot name="empty" slot="empty"></slot>
      <slot></slot>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'

import { Autocomplete } from '../Input'
import { InputTypes } from './consts'

@Component
export default class SSelect extends Vue {
  /**
   * Selected value. Can be used with `v-model`
   */
  @Prop() readonly value!: any
  /**
   * Input type of the select component. Available values: `"input"`, `"select"`.
   *
   * `"input"` is set by default
   */
  @Prop({ type: String, default: InputTypes.INPUT }) readonly inputType!: string
  /**
   * Placeholder of the select component.
   *
   * `"Select"` is set by default
   */
  @Prop({ type: String, default: 'Select' }) readonly placeholder!: string
  /**
   * Multiple text prefix property. For instance, when user selected 3 items then it should be
   * displayed as `"Something (3)"`. If it's not set then `placeholder` is used by default
   */
  @Prop({ type: String, default: '' }) readonly multipleTextPrefix!: string
  /**
   * Loading text of the select component.
   *
   * `"Loading"` is set by default
   */
  @Prop({ type: String, default: 'Loading' }) readonly loadingText!: string
  /**
   * Displayed text when there is no options, you can also use slot `empty`.
   *
   * `"No data"` is set by default
   */
  @Prop({ type: String, default: 'No data' }) readonly noDataText!: string
  /**
   * Name attribute for input
   */
  @Prop({ type: String, default: '' }) readonly name!: string
  /**
   * Autocomplete property of native input. `"off"` by default
   */
  @Prop({ default: Autocomplete.OFF, type: String }) readonly autocomplete!: string
  /**
   * Disabled state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Loading state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  /**
   * Multiple state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean
  /**
   * Multiple limit for the select component when `multiple` is true.
   * Has no limit when `multiple-limit=0`.
   *
   * `0` by default
   */
  @Prop({ type: Number, default: 0 }) readonly multipleLimit!: number
  /**
   * Clearable state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly clearable!: boolean

  @Ref('select') select!: any

  model = this.value
  focused = false

  private updateInputValue (): void {
    if (!this.multiple) {
      return
    }
    const tags = this.select.$el.getElementsByClassName('el-select__tags')[0] as Element
    if (tags) {
      tags.remove()
    }
    const input = this.select.$el.getElementsByClassName('el-input__inner')[0] as HTMLInputElement
    input.value = this.model.length ? `${this.multipleTextPrefix || this.placeholder} (${this.model.length})` : ''
  }

  @Watch('value')
  private handlePropChange (value: any): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: any): void {
    this.$emit('input', value)
    this.$emit('change', value)
    this.updateInputValue()
  }

  mounted (): void {
    this.$nextTick(this.updateInputValue)
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if ((Object.values(InputTypes) as Array<string>).includes(this.inputType)) {
      cssClasses.push(this.inputType)
    }
    if (this.focused) {
      cssClasses.push('focused')
    }
    if (this.disabled) {
      cssClasses.push('disabled')
    }
    return cssClasses
  }

  get willPlaceholderBeShown (): boolean {
    if (this.inputType !== InputTypes.INPUT) {
      return false
    }
    return !!(this.model && this.model.length !== 0 && this.placeholder)
  }

  handleChange (selected: any): void {
    this.$emit('change', selected)
  }

  handleBlur (event: Event): void {
    this.focused = false
    this.$emit('blur', event)
  }

  handleFocus (event: Event): void {
    if (this.disabled) {
      return
    }
    this.focused = true
    this.$emit('focus', event)
  }

  handleVisibleChange (isAppear: boolean): void {
    this.focused = isAppear
    this.$emit('visible-change', isAppear)
  }

  handleClear (): void {
    this.$emit('clear')
  }

  public focus (): void {
    this.select.focus()
  }

  public blur (): void {
    this.select.blur()
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.s-select {
  font-family: $font-family-default;
  width: 100%;
  position: relative;
  .el-select {
    width: 100%;
    .el-input {
      &.is-focus .el-input__inner {
        border-color: $color-neutral-placeholder;
      }
      .el-input__inner {
        &::placeholder {
          color: $color-neutral-secondary;
          opacity: 1; // Firefox
        }
      }
      .el-select__caret {
        color: $color-neutral-secondary;
      }
    }
  }
  &.input {
    .el-select {
      .el-input__inner {
        height: $size-big;
        padding: 0 15px;
        border: 1px solid $color-neutral-placeholder;
        background-color: $color-neutral-placeholder;
        &:focus {
          border-color: $color-neutral-placeholder;
        }
      }
    }
    &:hover {
      .el-select {
        .el-input__inner {
          border-color: $color-neutral-hover;
          background-color: $color-neutral-hover;
        }
      }
      .placeholder {
        background-color: $color-neutral-hover;
      }
    }
    .placeholder + .el-select {
      .el-input__inner {
        padding-top: 12px;
      }
      .el-input__validateIcon {
        padding-top: 11px;
      }
    }
    &.focused {
      .el-select {
        .el-input__inner {
          border-color: $color-neutral-border;
          background-color: $color-basic-white;
        }
      }
      .placeholder {
        background-color: $color-basic-white;
      }
    }
    &.disabled {
      .el-select {
        .el-select__caret {
          color: $color-neutral-secondary;
        }
        .el-input__inner, .el-input__inner:hover {
          border-color: $color-neutral-border;
          color: $color-neutral-secondary;
          background-color: $color-neutral-placeholder;
          &::placeholder {
            color: $color-neutral-secondary;
          }
        }
      }
      .placeholder {
        color: $color-neutral-secondary;
        background-color: $color-neutral-placeholder;
      }
    }
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
  &.select {
    .el-select {
      .el-input__inner {
        border-radius: 8px;
        padding-left: 12px;
        &:hover {
          border-color: $color-neutral-inactive;
        }
        &::placeholder {
          color: $color-neutral-tertiary;
        }
        &:focus {
          border-color: $color-neutral-inactive;
        }
      }
    }
    &.focused {
      .el-select .el-input__inner {
        border-color: $color-neutral-inactive;
      }
    }
    &.disabled {
      .el-select {
        .el-input__inner {
          color: $color-neutral-inactive;
          border-color: $color-neutral-border;
          background-color: $color-basic-white;
          &::placeholder {
            color: $color-neutral-inactive;
          }
        }
        .el-select__caret {
          color: $color-neutral-inactive;
        }
      }
    }
  }
}
.el-select-dropdown__item {
  &.hover, &:hover {
    background-color: $color-neutral-placeholder;
  }
  &.is-disabled {
    color: $color-neutral-inactive;;
  }
}
.el-select-dropdown.is-multiple .el-select-dropdown__item {
  > span {
    padding-left: 16px;
    vertical-align: top;
    color: $color-basic-black;
    font-weight: normal;
  }
  &::before {
    font-family: "element-icons";
    content: "\e6da";
    color: $color-basic-white;
    border: 1px solid $color-neutral-border;
    background-color: $color-basic-white;
    font-size: 16px;
    font-weight: bold;
    padding: 1px;
    border-radius: 4px;
  }
  &.selected {
    &.hover {
      background-color: $color-neutral-placeholder;
    }
    &::before {
      color: $color-basic-white;
      background-color: $color-main-brand;
      border-color: $color-main-brand;
    }
    &::after {
      content: '';
    }
  }
}
</style>
