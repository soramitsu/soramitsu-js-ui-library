<template>
  <div class="s-date-picker" :class="computedClasses">
    <span v-if="willPlaceholderBeShown" class="placeholder">{{ placeholder }}</span>
    <el-date-picker
      ref="picker"
      v-model="model"
      :type="type"
      :unlink-panels="unlinkPanels"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="willHaveClearButton"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="format"
      :align="align"
      :popper-class="popperClass"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :default-value="defaultValue"
      :default-time="defaultTime"
      :value-format="valueFormat"
      prefix-icon="-"
      :clear-icon="clearIcon"
      :validate-event="validateEvent"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <slot name="range-separator" slot="range-separator"></slot>
    </el-date-picker>
    <i v-if="!isInputType" class="s-icon-chevron-bottom"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'

import { PickerTypes, PickerSize, PickerAlignment, InputTypes } from './consts'

@Component
export default class SDatePicker extends Vue {
  /**
   * Value of date picker component. Can be used with `v-model`.
   * Can be date object / array with date objects for date range picker
   */
  @Prop() readonly value!: any
  /**
   * Type of the date picker component. Available values:
   *
   * `"year"`/`"month"`/`"date"`/`"dates"`/`"datetime"`/`"week"`/`"datetimerange"`/`"daterange"`/`"monthrange"`
   */
  @Prop({ type: String, default: PickerTypes.DATE }) readonly type!: string
  /**
   * Input type of the datepicker component. Available values: `"input"`, `"select"`.
   * `"input"` can be set only when `type` is not range. Otherwise, `"select"` will be set automatically.
   *
   * `"input"` is set by default
   */
  @Prop({ type: String, default: InputTypes.INPUT }) readonly inputType!: string
  /**
   * When in range mode, the left and right panels are linked by default.
   * Set `unlink-panels=true` if you want the two panels to switch current months independently.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly unlinkPanels!: boolean
  /**
   * Readonly state of the date picker component
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean
  /**
   * Disabled state of the date picker component
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Editable state of the date picker input
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly editable!: boolean
  /**
   * Clearable state of the date picker input. It will be set **only** when `inputType="input"`.
   * TODO: ask design team about it
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean
  /**
   * Size of the date picker input
   * TODO: ask design team
   * `"medium"` by default
   */
  // @Prop({ type: String, default: PickerSize.MEDIUM }) readonly size!: string
  /**
   * Placeholder in non-range mode
   */
  @Prop({ type: String, default: '' }) readonly placeholder!: string
  /**
   * Placeholder for the start date in range mode
   */
  @Prop({ type: String, default: '' }) readonly startPlaceholder!: string
  /**
   * Placeholder for the end date in range mode
   */
  @Prop({ type: String, default: '' }) readonly endPlaceholder!: string
  /**
   * Format for dates of the displayed value in the input box.
   *
   * See: https://element.eleme.io/#/en-US/component/date-picker#date-formats
   */
  @Prop({ type: String }) readonly format!: string
  /**
   * Alignment. Available values: `"left"`/`"center"`/`"right"`
   *
   * `"left"` is set by default
   */
  @Prop({ type: String, default: PickerAlignment.LEFT }) readonly align!: string
  /**
   * Custom class name for date picker's dropdown
   */
  @Prop({ type: String }) readonly popperClass!: string
  /**
   * Additional set of presets for range date picker component.
   *
   * See: https://element.eleme.io/#/en-US/component/date-picker#picker-options
   */
  @Prop({ type: Object }) readonly pickerOptions!: object
  /**
   * Range separator.
   *
   * `"-"` by default
   */
  @Prop({ type: String, default: '-' }) readonly rangeSeparator!: string
  /**
   * Default date of the calendar
   */
  @Prop() readonly defaultValue!: any
  /**
   * The time value to use when selecting date range
   */
  @Prop({ type: Array }) readonly defaultTime!: Array<string>
  /**
   * Format of binding value. If not specified, the binding value will be a `Date` object.
   *
   * See https://element.eleme.io/#/en-US/component/date-picker#date-formats
   */
  @Prop({ type: String }) readonly valueFormat!: string
  /**
   * Name of the native input
   */
  @Prop({ type: String }) readonly name!: string
  /**
   * Custom prefix icon class
   * TODO: ask design team about it
   */
  // @Prop({ type: String, default: '-' }) readonly prefixIcon!: string
  /**
   * Clear button icon class.
   *
   * `"el-icon-circle-close"` is set by default
   */
  @Prop({ type: String, default: 'el-icon-circle-close' }) readonly clearIcon!: string
  /**
   * Will be validation event triggered from form.
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly validateEvent!: boolean

  @Ref('picker') picker!: any

  model = this.value
  focused = false

  @Watch('value')
  private handlePropChange (value: any): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: any): void {
    this.$emit('input', value)
    this.$emit('change', value)
  }

  get isRange (): boolean {
    return ([PickerTypes.DATETIMERANGE, PickerTypes.DATERANGE, PickerTypes.MONTHRANGE] as Array<string>).includes(this.type)
  }

  get isInputType (): boolean {
    return !this.isRange && this.inputType === InputTypes.INPUT
  }

  get willHaveClearButton (): boolean {
    return this.isInputType && this.clearable
  }

  get willPlaceholderBeShown (): boolean {
    if (!this.isInputType) {
      return false
    }
    return !!(this.model && this.placeholder)
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if ((Object.values(InputTypes) as Array<string>).includes(this.inputType)) {
      if (!this.isInputType) {
        cssClasses.push(InputTypes.SELECT)
      } else {
        cssClasses.push(this.inputType)
      }
    }
    if (this.focused) {
      cssClasses.push('focused')
    }
    if (this.disabled) {
      cssClasses.push('disabled')
    }
    if ((!this.isRange && this.model) || (this.isRange && this.model.length !== 0)) {
      cssClasses.push('has-value')
    }
    return cssClasses
  }

  handleChange (value: any): void {
    this.$emit('change', value)
  }

  handleBlur (component: any): void {
    this.focused = false
    this.$emit('blur', component)
  }

  handleFocus (component: any): void {
    if (this.disabled || this.readonly) {
      return
    }
    this.focused = true
    this.$emit('focus', component)
  }

  public focus (): void {
    this.picker.focus()
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.s-date-picker {
  font-family: $font-family-default;
  width: 100%;
  position: relative;
  .el-date-editor {
    width: 100%;
    &.el-input, &.el-input__inner {
      width: 100%;
    }
    .el-range-separator {
      color: $color-neutral-tertiary;
    }
    .el-input__inner, .el-range-input {
      &::placeholder {
        color: $color-neutral-secondary;
        opacity: 1; // Firefox
      }
    }
    &.is-active {
      border-color: $color-neutral-border;
    }
  }
  &.has-value {
    .el-date-editor .el-range-separator {
      color: $color-basic-black;
    }
  }
  &.input {
    min-height: $size-big;
    .el-input__inner {
      height: $size-big;
      padding: 0 15px;
      border: 1px solid $color-neutral-placeholder;
      background-color: $color-neutral-placeholder;
    }
    &:hover {
      .el-input__inner {
        border-color: $color-neutral-hover;
      }
      .el-input__inner, .placeholder {
        background-color: $color-neutral-hover;
      }
    }
    .placeholder + .el-date-editor {
      > .el-input__inner {
        padding-top: 12px;
      }
      .el-input__validateIcon {
        padding-top: 11px;
      }
    }
    &.focused {
      .el-input__inner {
        border-color: $color-neutral-border;
      }
      .el-input__inner, .placeholder {
        background-color: $color-basic-white;
      }
    }
    &.disabled {
      .el-input__inner {
        border-color: $color-neutral-border;
      }
      .el-input__inner, .placeholder {
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
    .el-date-editor {
      .el-input__inner, .el-range-input, .el-range-separator {
        font-weight: bold;
      }
      &.el-input__inner, & .el-input__inner {
        border-radius: 8px;
        padding-left: 12px;
        &:hover {
          border-color: $color-neutral-inactive;
        }
        &::placeholder, .el-range-input::placeholder {
          color: $color-neutral-tertiary;
          font-weight: bold;
        }
      }
    }
    &.focused {
      .el-date-editor.el-input__inner,
      .el-date-editor .el-input__inner {
        border-color: $color-neutral-inactive;
      }
      &:not(.disabled) .s-icon-chevron-bottom {
        transform: rotate(180deg);
      }
    }
    .s-icon-chevron-bottom {
      position: absolute;
      right: 10px;
      top: 30%;
      pointer-events: none;
      color: $color-neutral-tertiary;
      transition: transform .3s;
    }
    &.has-value {
      .s-icon-chevron-bottom {
        color: $color-basic-black;
      }
    }
    &.disabled {
      .el-date-editor.el-input__inner,
      .el-date-editor .el-input__inner {
        color: $color-neutral-inactive;
        border-color: $color-neutral-border;
        background-color: $color-basic-white;
        &::placeholder {
          color: $color-neutral-inactive;
        }
        .el-range-input {
          background-color: $color-basic-white;
          color: $color-neutral-inactive;
          &::placeholder {
            color: $color-neutral-inactive;
          }
        }
        .el-range-separator {
          color: $color-neutral-inactive;
        }
      }
      .s-icon-chevron-bottom {
        color: $color-neutral-inactive;
      }
    }
  }
}
.el-picker-panel__icon-btn,
.el-date-picker__header-label,
.el-date-table td,
.el-date-table th,
.el-picker-panel__link-btn,
.el-time-panel__btn,
.el-date-range-picker__time-header > .el-icon-arrow-right {
  color: $color-basic-black;
}
.el-picker-panel {
  border-color: $color-neutral-hover;
  .el-picker-panel__content {
    .el-date-table {
      td {
        &.available:hover {
          color: $color-main-brand;
        }
        &.next-month, &.prev-month {
          color: $color-neutral-inactive;
        }
      }
      th {
        border-bottom-color: $color-neutral-hover;
      }
    }
  }
  .el-picker-panel__footer {
    border-top-color: $color-neutral-hover;
    > .el-button {
      height: 32px;
      border-radius: 4px;
    }
  }
  div[x-arrow].popper__arrow {
    border-bottom-color: $color-neutral-hover;
  }
}
.el-time-panel {
  border-radius: 4px;
  border-color: $color-neutral-hover;
  .el-time-panel__footer {
    border-top-color: $color-neutral-hover;
  }
  .el-time-spinner__item {
    &.active:not(.disabled) {
      color: $color-basic-black;
    }
    &:hover:not(.disabled):not(.active) {
      background-color: $color-neutral-placeholder;
    }
  }
  .el-time-panel__content {
    &::after, &::before {
      border-top-color: $color-neutral-hover;
      border-bottom-color: $color-neutral-hover;
    }
  }
}
.el-date-table.is-week-mode .el-date-table__row {
  &.current, &:hover {
    div {
      background-color: $color-main-hover-light;
    }
  }
}
.el-month-table td.in-range div {
  background-color: $color-main-hover-light;
  &:hover {
    background-color: $color-main-hover-light;
  }
}
.el-date-table td.in-range div {
  background-color: $color-main-hover-light;
  &:hover {
    background-color: $color-main-hover-light;
  }
}
.el-date-range-picker__content.is-left {
  border-right-color: $color-neutral-hover;
}
</style>
